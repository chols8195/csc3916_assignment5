const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

// Movie schema
const MovieSchema = new Schema({
  title: {
    type: String, 
    required: true, 
    index: true
  },
  releaseDate: {
    type: Number, 
    min: [1900, 'Must be greater than 1899'],
    max: [2100, 'Must be less than 2100'],
    required: true
  },
  genre: {
    type: String, 
    required: true, 
    enum: [
      'Action',
      'Adventure',
      'Animation',
      'Comedy',
      'Drama',
      'Family',
      'Fantasy',
      'Horror',
      'Mystery',
      'Romance',
      'Sci-Fi',
      'Science Fiction',
      'Thriller',
      'Western'
    ],
  },
  actors: {
    type: [{
      actorName: { type: String, required: true },
      characterName: { type: String, required: true },
    }],
    validate: {
      validator: function(actors) {
        return actors && actors.length >= 3;
      },
      message: 'A movie must have at least 3 actors'
    },
    required: true
  },
  imageUrl: { 
    type: String 
  },
  status: {
    type: String,
    enum: ['now_playing', 'coming_soon'],
    default: 'now_playing'
  }
}, { timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema);