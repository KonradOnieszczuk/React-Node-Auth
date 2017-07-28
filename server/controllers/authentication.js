const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');


var tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
};

exports.signin = (req, res, next) => {
    // User has already had their email and password auth'd
    // We just need to give them a token
    res.send({ token: tokenForUser(req.user)});
};

exports.signup = async (req, res, next) => {
    // See if a user with the given email exists
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password){
        return res.status(422).send({ error: 'You must provide email and password' });
    }
    try {
        const user = await User.findOne({email});

        if (user){
            return res.status(422).send({ error: 'Email is in use' });
        }
    } catch (err) {
        return next(err);
    }
    // User.findOne({ email }).then((err, existingUser) => {
    //     if (err) { return next(err); }
    //
    //     // If a user with email does exist, return an error
    //     if (existingUser){
    //         return res.status(422).send({ error: 'Email is in use' });
    //     }
    // });

    // If a user with email does NOT exist, create and save user record
    const user = new User({ email, password });

    // Respond to request indicating the user was created
    try {
        const doc = await user.save();
        res.send({token: tokenForUser(doc)});
    } catch (err){
        return next(err);
    }

    // user.save().then((doc) => res.send({token: tokenForUser(doc)})).catch((err) => next(err));

};