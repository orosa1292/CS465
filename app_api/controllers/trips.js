const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

//const User = mongoose.model('User'); 
const User = require('../models/user');

const getUser = async (req, res, callback) => {
    try {

        console.log("checking req.payload:", req.payload);
      if (!req.payload || !req.payload.email) {
        console.log("NO email found in req.payloud:", req.payload);

        return res.status(404).json({ message: "User not found" });
      }
  
      // Await the result without using a callback
      const user = await User.findOne({ email: req.payload.email });

  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Call the callback function with the user's name
      callback(req, res, user.name);
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  };

/*
const getUser = async(req, res, callback) => {
  
    if (req.payload && req.payload.email) {            
    const user = await User
      .findOne({ email : req.payload.email })         
      .exec((err, user) => {
        if (!user) {
          return res
            .status(404)
            .json({"message": "User not found"});
        } else if (err) {
          console.log(err);
          return res
            .status(404)
            .json(err);
         }
        callback(req, res, user.name);                
       });
  } else {
    return res
      .status(404)
      .json({"message": "User not found"});
  }
};
*/

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client

const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, async (req, res) => {
        try {
            const trip = await Trip.findOneAndUpdate(
                { code: req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                { new: true } // Returns updated document
            );

            if (!trip) {
                return res.status(404).json({ message: `Trip not found with code: ${req.params.tripCode}` });
            }

            res.status(200).json(trip);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    });
};


/* COPIED CODE NOT WORKING
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
             Trip
                .findOneAndUpdate({'code': req.params.tripCode },{
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                 }, { new: true })
                .then(trip => {
                    if (!trip) {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code" + req.params.tripCode
                            });
                    }
                    res.send(trip);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code" + req.params.tripCode
                            });
                    }
                    return res
                        .status(500) // server error
                        .json(err);
                });
        }
    );
} 
    */


/* OLD CODE WORKING
const tripsUpdateTrip = async(req, res) => {
    // Uncomment for debugging
    // console.log(req.params);
    // console.log(req.body);
    const q = await Model
        .findOneAndUpdate(
            {'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
    .exec();

    if(!q)
    { // Database returned no data
        return res
            .status(400)
            .json(err);
    } else { // Return resulting updated trip
        return res
         .status(201)
         .json(q);
        }

        // Uncomment the following line to show results of operation
        // // on the console
        // console.log(q);
    };
    */


// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client

const tripsAddTrip = async (req, res) => {
    // Retrieve the user before proceeding
    getUser(req, res, async (req, res, user) => {
        try {
            const newTrip = new Trip({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description,
            });

            const q = await newTrip.save();

            if (!q) {
                return res.status(400).json({ message: "Failed to save trip." });
            }

            return res.status(201).json(q); // Successfully created trip
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    });
};


/* ATTEMPTED NEW CODE -- NOT WORKING
const tripsAddTrip = async (req, res) => {
    getUser(req, res, async (req, res) => {
        try {
            const trip = await Trip.create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            });

            return res.status(201).json(trip); // 201 = Created

        } catch (err) {
            return res.status(400).json(err); // 400 = Bad Request
        }
    });
};
*/

/* NEW CODE COPIED FROM TEXT NOT WORKING
const tripsAddTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Trip
                .create({
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                (err, trip) => {
                    if (err) {
                        return res
                            .status(400) // bad request
                            .json(err);
                    } else {
                        return res
                            .status(201) // created
                            .json(trip);
                     } 
                });
        }
    );
} 
    */

/* OLD CODE -- working prior
const tripsAddTrip = async(req, res) => {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        const q = await newTrip.save();

            if(!q){
                //Database returned no data
                return res.status(400).json(err);
            }
            else{
                //Return new trip
                return res.status(201).json(q);
            }
}
 */

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

        // Uncomment the following line to show results of query
        // on the console
        // console.log(q);

    // Database returned no data
    if(!q) {
        return res
                .status(404)
                .json(err);
    }
    // Return resulting trip list
    else {
        return res
                .status(200)
                .json(q);
    }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) // return single record
        .exec();

        // Uncomment the following line to show results of query
        // on the console
        // console.log(q);

    // Database returned no data
    if(!q) {
        return res
                .status(404)
                .json(err);
    }
    // Return resulting trip list
    else {
        return res
                .status(200)
                .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    getUser
};