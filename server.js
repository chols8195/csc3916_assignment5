require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const authJwtController = require('./auth_jwt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./Users');
const Movie = require('./Movies');
const Review = require('./Reviews');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

// Connection to MongoDB
mongoose.connect(process.env.DB)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err))

const router = express.Router();

async function trackEvent(movieTitle, genre) {
  const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;
  const GA_API_SECRET = process.env.GA_API_SECRET;

  if (!GA_MEASUREMENT_ID || !GA_API_SECRET) {
    console.log('Google Analytics not configured');
    return;
  }

  const clientId = crypto.randomBytes(16).toString('hex');

  const payload = {
    client_id: clientId,
    events: [{
      name: 'movie_review',
      params: {
        movie_name: movieTitle,
        genre: genre,
        event_category: genre,
        event_action: 'POST /reviews',
        event_label: 'API Request for Movie Review',
        value: 1
      }
    }]
  };

  try {
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      }
    );
    console.log('Analytics event sent for:', movieTitle);
  } catch (err) {
    console.error('Analytics error:', err);
  }
}

router.post('/signup', async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).json({ success: false, msg: 'Please include both username, email, and password to signup.' });
  }

  try {
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    res.status(201).json({ success: true, msg: 'Successfully created new user.' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'A user with that username or email already exists.' });
    } else {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
  }
});

router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.username }
      ]
    }).select('name username email password');

    if (!user) {
      return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);

    if (isMatch) {
      const userToken = { id: user._id, username: user.username };
      const token = jwt.sign(userToken, process.env.SECRET_KEY, { expiresIn: '24h' });
      res.json({ success: true, token: 'JWT ' + token });
    } else {
      res.status(401).json({ success: false, msg: 'Authentication failed. Incorrect password.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
  }
});

router.route('/movies')
  .get(authJwtController.isAuthenticated, async (req, res) => {
    try {
      let matchFilter = {};
      if (req.query.status) {
        matchFilter.status = req.query.status;
      }

      if (req.query.reviews === 'true') {
        const moviesWithReviews = await Movie.aggregate([
          { $match: matchFilter },
          {
            $lookup: {
              from: 'reviews',
              localField: '_id',
              foreignField: 'movieId',
              as: 'reviews'
            }
          },
          {
            $addFields: {
              avgRating: { $avg: '$reviews.rating' }
            }
          },
          {
            $sort: { avgRating: -1 }
          }
        ]);
        return res.status(200).json({ success: true, movies: moviesWithReviews });
      }

      const movies = await Movie.aggregate([
        { $match: matchFilter },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'movieId',
            as: 'reviewsData'
          }
        },
        {
          $addFields: {
            avgRating: { $avg: '$reviewsData.rating' }
          }
        },
        {
          $sort: { avgRating: -1 }
        },
        {
          $project: {
            reviewsData: 0
          }
        }
      ]);
      res.status(200).json({ success: true, movies });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error fetching movies' });
    }
  })
  .post(authJwtController.isAuthenticated, async (req, res) => {
    try {
      const { title, releaseDate, genre, actors } = req.body;

      if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' });
      }
      if (!releaseDate) {
        return res.status(400).json({ success: false, message: 'Release date is required' });
      }
      if (!genre) {
        return res.status(400).json({ success: false, message: 'Genre is required' });
      }
      if (!actors || actors.length < 3) {
        return res.status(400).json({ success: false, message: 'At least 3 actors are required' });
      }

      for (let i = 0; i < actors.length; i++) {
        if (!actors[i].actorName || !actors[i].characterName) {
          return res.status(400).json({
            success: false,
            message: `Actor ${i + 1} must have both actorName and characterName`
          });
        }
      }

      const movie = new Movie({ title, releaseDate, genre, actors });
      await movie.save();

      res.status(201).json({ success: true, message: 'Movie saved successfully', movie });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error saving movie', error: err.message });
    }
  })
  .put((req, res) => {
    res.status(405).json({ success: false, message: 'PUT method not allowed on /movies. Use /movies/:id instead' });
  })
  .delete((req, res) => {
    res.status(405).json({ success: false, message: 'DELETE method not allowed on /movies. Use /movies/:id instead' });
  });

// GET, PUT, DELETE for specific movie (supports both ID and title)
router.route('/movies/:identifier')
  .get(authJwtController.isAuthenticated, async (req, res) => {
    try {
      const identifier = req.params.identifier;
      let movie;

      // Check if identifier is a MongoDB ObjectId (24 hex characters)
      if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        movie = await Movie.findById(identifier);
      } else {
        movie = await Movie.findOne({ title: identifier });
      }

      if (!movie) {
        return res.status(404).json({ success: false, message: 'Movie not found' });
      }

      // Check if reviews=true query parameter is passed
      if (req.query.reviews === 'true') {
        const movieWithReviews = await Movie.aggregate([
          {
            $match: { _id: movie._id }
          },
          {
            $lookup: {
              from: 'reviews',
              localField: '_id',
              foreignField: 'movieId',
              as: 'reviews'
            }
          },
          {
            $addFields: {
              avgRating: { $avg: '$reviews.rating' }
            }
          }
        ]);

        return res.status(200).json({ success: true, movie: movieWithReviews[0] });
      }

      res.status(200).json({ success: true, movie });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error fetching movie' });
    }
  })
  .put(authJwtController.isAuthenticated, async (req, res) => {
    try {
      const { title, releaseDate, genre, actors } = req.body;
      const identifier = req.params.identifier;

      if (actors && actors.length < 3) {
        return res.status(400).json({ success: false, message: 'At least 3 actors are required' });
      }

      let movie;
      if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        movie = await Movie.findByIdAndUpdate(
          identifier,
          { title, releaseDate, genre, actors },
          { new: true, runValidators: true }
        );
      } else {
        movie = await Movie.findOneAndUpdate(
          { title: identifier },
          { title, releaseDate, genre, actors },
          { new: true, runValidators: true }
        );
      }

      if (!movie) {
        return res.status(404).json({ success: false, message: 'Movie not found' });
      }

      res.status(200).json({ success: true, message: 'Movie updated successfully', movie });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error updating movie', error: err.message });
    }
  })
  .delete(authJwtController.isAuthenticated, async (req, res) => {
    try {
      const identifier = req.params.identifier;
      let movie;

      if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        movie = await Movie.findByIdAndDelete(identifier);
      } else {
        movie = await Movie.findOneAndDelete({ title: identifier });
      }

      if (!movie) {
        return res.status(404).json({ success: false, message: 'Movie not found' });
      }

      res.status(200).json({ success: true, message: 'Movie deleted successfully' });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error deleting movie', error: err.message });
    }
  })
  .post((req, res) => {
    res.status(405).json({ success: false, message: 'POST method not allowed on /movies/:id. Use /movies instead' });
  });

router.route('/reviews')
  .get(authJwtController.isAuthenticated, async (req, res) => {
    try {
      const reviews = await Review.find({}).populate('movieId', 'title');
      res.status(200).json({ success: true, reviews });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error fetching reviews' });
    }
  })
  .post(authJwtController.isAuthenticated, async (req, res) => {
    try {
      const { movieId, review, rating } = req.body;
      const username = req.user.username; // Get username from JWT token

      if (!movieId || !review || rating === undefined) {
        return res.status(400).json({ success: false, message: 'movieId, review, and rating are required' });
      }

      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).json({ success: false, message: 'Movie not found' });
      }

      const newReview = new Review({ movieId, username, review, rating });
      await newReview.save();

      trackEvent(movie.title, movie.genre);

      res.status(201).json({ message: 'Review created!' });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error creating review', error: err.message });
    }
  });

// Search endpoint for extra credit
router.post('/search', authJwtController.isAuthenticated, async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.trim() === '') {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }

    const searchRegex = new RegExp(query, 'i');

    const movies = await Movie.aggregate([
      {
        $match: {
          $or: [
            { title: searchRegex },
            { 'actors.actorName': searchRegex },
            { 'actors.characterName': searchRegex },
            { genre: searchRegex }
          ]
        }
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'movieId',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          avgRating: { $avg: '$reviews.rating' }
        }
      },
      {
        $sort: { avgRating: -1 }
      }
    ]);

    res.status(200).json({ success: true, movies, count: movies.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error searching movies', error: err.message });
  }
});

// Root route
router.get('/', (req, res) => {
  res.json({
    message: 'CSC3916 Assignment 5: Movies API',
    endpoints: {
      signup: 'POST /signup',
      signin: 'POST /signin',
      movies: {
        getAll: 'GET /movies',
        getOne: 'GET /movies/:id',
        create: 'POST /movies',
        update: 'PUT /movies/:id',
        delete: 'DELETE /movies/:id'
      },
      reviews: {
        getAll: 'GET /reviews',
        create: 'POST /reviews'
      },
      search: 'POST /search'
    }
  });
});

app.use('/', router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;