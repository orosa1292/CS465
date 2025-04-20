// Bring in the DB connection and the Trip schema
const Mongoose = require('./db');
const Trip = require('./travlr');
//const User = require('./user');


// Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));


// delete any existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});

/*
// Function to seed the database
const seedDB = async () => {
  try {
    console.log('Deleting existing trips...');
    await Trip.deleteMany({});
    console.log('Inserting seed trips...');
    await Trip.insertMany(trips);
    console.log('Seeding completed!');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

// Wait for the MongoDB connection to open
Mongoose.connection.once('open', async () => {
  console.log('Database connection is open. Starting seed process...');
  await seedDB();
  // Close the connection after seeding
  await Mongoose.connection.close();
  process.exit(0);
});
*/