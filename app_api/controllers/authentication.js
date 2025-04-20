const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
//const User = require('../models/user');

const register = async(req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"});
    }
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    const q = await user.save();

    if(!q){
        //Database returned no data
        return res.status(400).json(err);
    }
    else{
        //Return new trip
        return res.status(201).json(q);
    }
    /*
    user.save((err) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } 
        else {
            const token = user.generateJwt();
            res
                .status(200)
                .json({token});
        }
    })
        */
};
const login = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"});
    }
    passport.authenticate('local', (err, user, info) => {
    if (err) {
        return res
            .status(404)
            .json(err);
    }
    if (user) {
        const token = user.generateJwt();
        res
            .status(200)
            .json({token});
    } 
    else {
        res
            .status(401)
            .json(info);
    }
    })(req, res);
};
module.exports = {
    register,
    login
};