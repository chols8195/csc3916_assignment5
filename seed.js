require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./Movies');

mongoose.connect(process.env.DB)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

const movies = [
  // ============ NOW PLAYING (20 movies) ============
  {
    title: "Oppenheimer",
    releaseDate: 2023,
    genre: "Drama",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    actors: [
      { actorName: "Cillian Murphy", characterName: "J. Robert Oppenheimer" },
      { actorName: "Emily Blunt", characterName: "Kitty Oppenheimer" },
      { actorName: "Robert Downey Jr.", characterName: "Lewis Strauss" }
    ]
  },
  {
    title: "Barbie",
    releaseDate: 2023,
    genre: "Comedy",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    actors: [
      { actorName: "Margot Robbie", characterName: "Barbie" },
      { actorName: "Ryan Gosling", characterName: "Ken" },
      { actorName: "America Ferrera", characterName: "Gloria" }
    ]
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    releaseDate: 2023,
    genre: "Animation",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    actors: [
      { actorName: "Shameik Moore", characterName: "Miles Morales" },
      { actorName: "Hailee Steinfeld", characterName: "Gwen Stacy" },
      { actorName: "Oscar Isaac", characterName: "Miguel O'Hara" }
    ]
  },
  {
    title: "John Wick: Chapter 4",
    releaseDate: 2023,
    genre: "Action",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    actors: [
      { actorName: "Keanu Reeves", characterName: "John Wick" },
      { actorName: "Donnie Yen", characterName: "Caine" },
      { actorName: "Bill Skarsgård", characterName: "Marquis" }
    ]
  },
  {
    title: "Guardians of the Galaxy Vol. 3",
    releaseDate: 2023,
    genre: "Action",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    actors: [
      { actorName: "Chris Pratt", characterName: "Peter Quill" },
      { actorName: "Zoe Saldana", characterName: "Gamora" },
      { actorName: "Dave Bautista", characterName: "Drax" }
    ]
  },
  {
    title: "The Super Mario Bros. Movie",
    releaseDate: 2023,
    genre: "Animation",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    actors: [
      { actorName: "Chris Pratt", characterName: "Mario" },
      { actorName: "Anya Taylor-Joy", characterName: "Princess Peach" },
      { actorName: "Jack Black", characterName: "Bowser" }
    ]
  },
  {
    title: "Dune: Part Two",
    releaseDate: 2024,
    genre: "Sci-Fi",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    actors: [
      { actorName: "Timothée Chalamet", characterName: "Paul Atreides" },
      { actorName: "Zendaya", characterName: "Chani" },
      { actorName: "Rebecca Ferguson", characterName: "Lady Jessica" }
    ]
  },
  {
    title: "Everything Everywhere All at Once",
    releaseDate: 2022,
    genre: "Sci-Fi",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    actors: [
      { actorName: "Michelle Yeoh", characterName: "Evelyn Wang" },
      { actorName: "Ke Huy Quan", characterName: "Waymond Wang" },
      { actorName: "Stephanie Hsu", characterName: "Joy Wang" }
    ]
  },
  {
    title: "Parasite",
    releaseDate: 2019,
    genre: "Thriller",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    actors: [
      { actorName: "Song Kang-ho", characterName: "Kim Ki-taek" },
      { actorName: "Choi Woo-shik", characterName: "Kim Ki-woo" },
      { actorName: "Park So-dam", characterName: "Kim Ki-jung" }
    ]
  },
  {
    title: "The Dark Knight",
    releaseDate: 2008,
    genre: "Action",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    actors: [
      { actorName: "Christian Bale", characterName: "Bruce Wayne / Batman" },
      { actorName: "Heath Ledger", characterName: "The Joker" },
      { actorName: "Aaron Eckhart", characterName: "Harvey Dent" }
    ]
  },
  {
    title: "Interstellar",
    releaseDate: 2014,
    genre: "Sci-Fi",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    actors: [
      { actorName: "Matthew McConaughey", characterName: "Cooper" },
      { actorName: "Anne Hathaway", characterName: "Brand" },
      { actorName: "Jessica Chastain", characterName: "Murph" }
    ]
  },
  {
    title: "Spirited Away",
    releaseDate: 2001,
    genre: "Animation",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    actors: [
      { actorName: "Rumi Hiiragi", characterName: "Chihiro" },
      { actorName: "Miyu Irino", characterName: "Haku" },
      { actorName: "Mari Natsuki", characterName: "Yubaba" }
    ]
  },
  {
    title: "Inception",
    releaseDate: 2010,
    genre: "Sci-Fi",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    actors: [
      { actorName: "Leonardo DiCaprio", characterName: "Cobb" },
      { actorName: "Joseph Gordon-Levitt", characterName: "Arthur" },
      { actorName: "Elliot Page", characterName: "Ariadne" }
    ]
  },
  {
    title: "Your Name",
    releaseDate: 2016,
    genre: "Animation",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg",
    actors: [
      { actorName: "Ryunosuke Kamiki", characterName: "Taki Tachibana" },
      { actorName: "Mone Kamishiraishi", characterName: "Mitsuha Miyamizu" },
      { actorName: "Masami Nagasawa", characterName: "Miki Okudera" }
    ]
  },
  {
    title: "Avengers: Endgame",
    releaseDate: 2019,
    genre: "Action",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    actors: [
      { actorName: "Robert Downey Jr.", characterName: "Tony Stark / Iron Man" },
      { actorName: "Chris Evans", characterName: "Steve Rogers / Captain America" },
      { actorName: "Scarlett Johansson", characterName: "Natasha Romanoff" }
    ]
  },
  {
    title: "La La Land",
    releaseDate: 2016,
    genre: "Romance",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    actors: [
      { actorName: "Ryan Gosling", characterName: "Sebastian" },
      { actorName: "Emma Stone", characterName: "Mia" },
      { actorName: "John Legend", characterName: "Keith" }
    ]
  },
  {
    title: "The Shawshank Redemption",
    releaseDate: 1994,
    genre: "Drama",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    actors: [
      { actorName: "Tim Robbins", characterName: "Andy Dufresne" },
      { actorName: "Morgan Freeman", characterName: "Red" },
      { actorName: "Bob Gunton", characterName: "Warden Norton" }
    ]
  },
  {
    title: "Pulp Fiction",
    releaseDate: 1994,
    genre: "Thriller",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    actors: [
      { actorName: "John Travolta", characterName: "Vincent Vega" },
      { actorName: "Samuel L. Jackson", characterName: "Jules Winnfield" },
      { actorName: "Uma Thurman", characterName: "Mia Wallace" }
    ]
  },
  {
    title: "The Matrix",
    releaseDate: 1999,
    genre: "Sci-Fi",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    actors: [
      { actorName: "Keanu Reeves", characterName: "Neo" },
      { actorName: "Laurence Fishburne", characterName: "Morpheus" },
      { actorName: "Carrie-Anne Moss", characterName: "Trinity" }
    ]
  },
  {
    title: "Fight Club",
    releaseDate: 1999,
    genre: "Drama",
    status: "now_playing",
    imageUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    actors: [
      { actorName: "Brad Pitt", characterName: "Tyler Durden" },
      { actorName: "Edward Norton", characterName: "The Narrator" },
      { actorName: "Helena Bonham Carter", characterName: "Marla Singer" }
    ]
  },

  // ============ COMING SOON (20 movies) ============
  {
    title: "Deadpool & Wolverine",
    releaseDate: 2024,
    genre: "Action",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    actors: [
      { actorName: "Ryan Reynolds", characterName: "Wade Wilson / Deadpool" },
      { actorName: "Hugh Jackman", characterName: "Logan / Wolverine" },
      { actorName: "Emma Corrin", characterName: "Cassandra Nova" }
    ]
  },
  {
    title: "Inside Out 2",
    releaseDate: 2024,
    genre: "Animation",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    actors: [
      { actorName: "Amy Poehler", characterName: "Joy" },
      { actorName: "Maya Hawke", characterName: "Anxiety" },
      { actorName: "Phyllis Smith", characterName: "Sadness" }
    ]
  },
  {
    title: "Moana 2",
    releaseDate: 2024,
    genre: "Animation",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg",
    actors: [
      { actorName: "Auli'i Cravalho", characterName: "Moana" },
      { actorName: "Dwayne Johnson", characterName: "Maui" },
      { actorName: "Temuera Morrison", characterName: "Chief Tui" }
    ]
  },
  {
    title: "Joker: Folie à Deux",
    releaseDate: 2024,
    genre: "Drama",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/if8QiqCI7WAGImKcJCfzp6VTyKA.jpg",
    actors: [
      { actorName: "Joaquin Phoenix", characterName: "Arthur Fleck / Joker" },
      { actorName: "Lady Gaga", characterName: "Harley Quinn" },
      { actorName: "Brendan Gleeson", characterName: "Jackie Sullivan" }
    ]
  },
  {
    title: "Gladiator II",
    releaseDate: 2024,
    genre: "Action",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    actors: [
      { actorName: "Paul Mescal", characterName: "Lucius" },
      { actorName: "Denzel Washington", characterName: "Macrinus" },
      { actorName: "Pedro Pascal", characterName: "Marcus Acacius" }
    ]
  },
  {
    title: "Wicked",
    releaseDate: 2024,
    genre: "Fantasy",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg",
    actors: [
      { actorName: "Cynthia Erivo", characterName: "Elphaba" },
      { actorName: "Ariana Grande", characterName: "Glinda" },
      { actorName: "Jonathan Bailey", characterName: "Fiyero" }
    ]
  },
  {
    title: "Kraven the Hunter",
    releaseDate: 2024,
    genre: "Action",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/i47IUSsN126K11JUzqQIOi1Mg1M.jpg",
    actors: [
      { actorName: "Aaron Taylor-Johnson", characterName: "Sergei Kravinoff" },
      { actorName: "Ariana DeBose", characterName: "Calypso" },
      { actorName: "Russell Crowe", characterName: "Nikolai Kravinoff" }
    ]
  },
  {
    title: "Venom: The Last Dance",
    releaseDate: 2024,
    genre: "Action",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/k42Owka8v91trK1qMYwCQCNwJKr.jpg",
    actors: [
      { actorName: "Tom Hardy", characterName: "Eddie Brock / Venom" },
      { actorName: "Chiwetel Ejiofor", characterName: "General Strickland" },
      { actorName: "Juno Temple", characterName: "Dr. Teddy Paine" }
    ]
  },
  {
    title: "A Quiet Place: Day One",
    releaseDate: 2024,
    genre: "Horror",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/hU42CRk14JuPEdqZG3AWmagiPAP.jpg",
    actors: [
      { actorName: "Lupita Nyong'o", characterName: "Samira" },
      { actorName: "Joseph Quinn", characterName: "Eric" },
      { actorName: "Djimon Hounsou", characterName: "Henri" }
    ]
  },
  {
    title: "Furiosa: A Mad Max Saga",
    releaseDate: 2024,
    genre: "Action",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
    actors: [
      { actorName: "Anya Taylor-Joy", characterName: "Furiosa" },
      { actorName: "Chris Hemsworth", characterName: "Dementus" },
      { actorName: "Tom Burke", characterName: "Praetorian Jack" }
    ]
  },
  {
    title: "Kingdom of the Planet of the Apes",
    releaseDate: 2024,
    genre: "Sci-Fi",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    actors: [
      { actorName: "Owen Teague", characterName: "Noa" },
      { actorName: "Freya Allan", characterName: "Mae" },
      { actorName: "Kevin Durand", characterName: "Proximus Caesar" }
    ]
  },
  {
    title: "The Fall Guy",
    releaseDate: 2024,
    genre: "Action",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/tSz1qsmSJon0rqjHBxXZmrotuse.jpg",
    actors: [
      { actorName: "Ryan Gosling", characterName: "Colt Seavers" },
      { actorName: "Emily Blunt", characterName: "Jody Moreno" },
      { actorName: "Aaron Taylor-Johnson", characterName: "Tom Ryder" }
    ]
  },
  {
    title: "Despicable Me 4",
    releaseDate: 2024,
    genre: "Animation",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
    actors: [
      { actorName: "Steve Carell", characterName: "Gru" },
      { actorName: "Kristen Wiig", characterName: "Lucy" },
      { actorName: "Will Ferrell", characterName: "Maxime Le Mal" }
    ]
  },
  {
    title: "Beetlejuice Beetlejuice",
    releaseDate: 2024,
    genre: "Comedy",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg",
    actors: [
      { actorName: "Michael Keaton", characterName: "Beetlejuice" },
      { actorName: "Winona Ryder", characterName: "Lydia Deetz" },
      { actorName: "Jenna Ortega", characterName: "Astrid Deetz" }
    ]
  },
  {
    title: "Alien: Romulus",
    releaseDate: 2024,
    genre: "Horror",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
    actors: [
      { actorName: "Cailee Spaeny", characterName: "Rain" },
      { actorName: "David Jonsson", characterName: "Andy" },
      { actorName: "Archie Renaux", characterName: "Tyler" }
    ]
  },
  {
    title: "Twisters",
    releaseDate: 2024,
    genre: "Action",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg",
    actors: [
      { actorName: "Daisy Edgar-Jones", characterName: "Kate Carter" },
      { actorName: "Glen Powell", characterName: "Tyler Owens" },
      { actorName: "Anthony Ramos", characterName: "Javi" }
    ]
  },
  {
    title: "Bad Boys: Ride or Die",
    releaseDate: 2024,
    genre: "Action",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg",
    actors: [
      { actorName: "Will Smith", characterName: "Mike Lowrey" },
      { actorName: "Martin Lawrence", characterName: "Marcus Burnett" },
      { actorName: "Vanessa Hudgens", characterName: "Kelly" }
    ]
  },
  {
    title: "IF",
    releaseDate: 2024,
    genre: "Fantasy",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/xbKFv4KF3sVYuWKllLlwWDmuZP7.jpg",
    actors: [
      { actorName: "Ryan Reynolds", characterName: "Cal" },
      { actorName: "John Krasinski", characterName: "Dad" },
      { actorName: "Cailey Fleming", characterName: "Bea" }
    ]
  },
  {
    title: "Godzilla x Kong: The New Empire",
    releaseDate: 2024,
    genre: "Action",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
    actors: [
      { actorName: "Rebecca Hall", characterName: "Dr. Ilene Andrews" },
      { actorName: "Brian Tyree Henry", characterName: "Bernie Hayes" },
      { actorName: "Dan Stevens", characterName: "Trapper" }
    ]
  },
  {
    title: "Ghostbusters: Frozen Empire",
    releaseDate: 2024,
    genre: "Comedy",
    status: "coming_soon",
    imageUrl: "https://image.tmdb.org/t/p/w500/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    actors: [
      { actorName: "Paul Rudd", characterName: "Gary Grooberson" },
      { actorName: "Carrie Coon", characterName: "Callie Spengler" },
      { actorName: "Finn Wolfhard", characterName: "Trevor Spengler" }
    ]
  }
];

async function seedMovies() {
  try {
    await Movie.deleteMany({});
    console.log('Cleared existing movies');

    await Movie.insertMany(movies);
    console.log(`Successfully seeded ${movies.length} movies!`);
    
    const nowPlaying = movies.filter(m => m.status === 'now_playing').length;
    const comingSoon = movies.filter(m => m.status === 'coming_soon').length;
    console.log(`Now Playing: ${nowPlaying}, Coming Soon: ${comingSoon}`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (err) {
    console.error('Error seeding movies:', err);
    mongoose.connection.close();
  }
}

seedMovies();