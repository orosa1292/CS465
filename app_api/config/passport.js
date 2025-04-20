const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
//const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
   },

   async (username, password, done) => {
    try {
        const user = await User.findOne({ email: username }); // Use async/await instead of callbacks
        
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        
        if (!user.validPassword(password)) { // Assuming `validPassword` is a method on the schema
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}
   /*
   (username, password, done) => {
        User.findOne({ email: username }, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
            });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                     message: 'Incorrect password.'
                });
            }
            return done(null, user);
        });
    } 
        */
));