// require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
// const mongoose = require('mongoose');
// const Movie = require('../models/Movie');

// const movies = [
//   { title: '3 Idiots', genre: 'Comedy-Drama', year: 2009 },
//   { title: 'Dangal', genre: 'Sports Drama', year: 2016 },
//   { title: 'Zindagi Na Milegi Dobara', genre: 'Adventure-Drama', year: 2011 },
//   { title: 'Gully Boy', genre: 'Musical Drama', year: 2019 },
//   { title: 'Andhadhun', genre: 'Thriller', year: 2018 },
//   { title: 'Queen', genre: 'Comedy-Drama', year: 2013 },
//   { title: 'Article 15', genre: 'Crime Drama', year: 2019 },
//   { title: 'Lagaan', genre: 'Sports Drama', year: 2001 },
//   { title: 'Taare Zameen Par', genre: 'Drama', year: 2007 },
//   { title: 'Sholay', genre: 'Action-Adventure', year: 1975 },
//   { title: 'Inception', genre: 'Sci-Fi', year: 2010 },
//   { title: 'The Dark Knight', genre: 'Action', year: 2008 },
//   { title: 'Interstellar', genre: 'Sci-Fi', year: 2014 },
//   { title: 'Parasite', genre: 'Thriller', year: 2019 },
//   { title: 'The Shawshank Redemption', genre: 'Drama', year: 1994 },
//   { title: 'Whiplash', genre: 'Drama', year: 2014 },
//   { title: 'Spirited Away', genre: 'Animation', year: 2001 },
//   { title: 'The Pursuit of Happyness', genre: 'Drama', year: 2006 },
//   { title: 'The Social Network', genre: 'Drama', year: 2010 },
//   { title: 'Pather Panchali', genre: 'Drama', year: 1955 }
// ];

// async function seed() {
//   try {
//     if (!process.env.MONGO_URI) {
//       throw new Error('MONGO_URI is missing. Copy backend/.env.example to backend/.env and fill it in.');
//     }

//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('Connected to MongoDB for seeding...');

//     await Movie.deleteMany({});
//     console.log('Cleared existing movies');

//     await Movie.insertMany(movies);
//     console.log(`Seeded ${movies.length} movies successfully`);

//     process.exit(0);
//   } catch (err) {
//     console.error('Seeding failed:', err.message);
//     process.exit(1);
//   }
// }

// seed();

// require('dotenv').config({ 
//   path: require('path').resolve(__dirname, '../.env') 
// });

// const mongoose = require('mongoose');
// const Movie = require('../models/Movie');

// const movies = [

// {
//  title:"3 Idiots",
//  genre:"Comedy-Drama",
//  year:2009,
//  posterUrl:"https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg",
//  description:"Three engineering students experience friendship, pressure and dreams.",
//  rating:8.4
// },

// {
//  title:"Dangal",
//  genre:"Sports Drama",
//  year:2016,
//  posterUrl:"https://image.tmdb.org/t/p/w500/p2lVAcPuRPSO8Al6hDDGw0OgMi.jpg",
//  description:"A former wrestler trains his daughters to become world class wrestlers.",
//  rating:8.3
// },

// {
//  title:"Zindagi Na Milegi Dobara",
//  genre:"Adventure Drama",
//  year:2011,
//  posterUrl:"https://image.tmdb.org/t/p/w500/7d5oT0bR0Q9Z7u9k9.jpg",
//  description:"Three friends go on a life-changing road trip in Spain.",
//  rating:8.2
// },

// {
//  title:"Inception",
//  genre:"Sci-Fi",
//  year:2010,
//  posterUrl:"https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
//  description:"A thief enters people's dreams to steal secrets.",
//  rating:8.8
// },

// {
//  title:"Interstellar",
//  genre:"Sci-Fi",
//  year:2014,
//  posterUrl:"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
//  description:"Explorers travel through a wormhole to find a new home for humanity.",
//  rating:8.6
// },

// {
//  title:"The Dark Knight",
//  genre:"Action",
//  year:2008,
//  posterUrl:"https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
//  description:"Batman faces the Joker in Gotham City.",
//  rating:9.0
// },

// {
//  title:"Avengers Endgame",
//  genre:"Action",
//  year:2019,
//  posterUrl:"https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
//  description:"The Avengers fight their final battle against Thanos.",
//  rating:8.4
// },

// {
//  title:"Joker",
//  genre:"Crime Drama",
//  year:2019,
//  posterUrl:"https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
//  description:"A failed comedian becomes Gotham's criminal mastermind.",
//  rating:8.4
// },

// {
//  title:"RRR",
//  genre:"Action Drama",
//  year:2022,
//  posterUrl:"https://image.tmdb.org/t/p/w500/3M6v7o7dJ4HjF2kN.jpg",
//  description:"Two revolutionaries fight against British rule.",
//  rating:8.0
// },

// {
//  title:"KGF Chapter 2",
//  genre:"Action",
//  year:2022,
//  posterUrl:"https://image.tmdb.org/t/p/w500/9p6t9k7R2X2G.jpg",
//  description:"Rocky builds his empire in the KGF world.",
//  rating:8.4
// }

// ];

// async function seedDB() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected for seeding");

//     await Movie.deleteMany();
//     console.log("Old movies removed");

//     await Movie.insertMany(movies);
//     console.log("Movies inserted successfully ✅");

//     process.exit();
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// }

// seedDB();





























