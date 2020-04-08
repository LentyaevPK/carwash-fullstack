const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../model/User');

router.post('/register', (req, res) => {
    let {
        name,
        username,
        email,
        password,
        confirm_password
    } = req.body;

    if(password !== confirm_password) {
        return res.status(400).json({
            msg: 'Password do not match'
        })
    }
    // Check for the unique username
    User.findOne({username: username}).then(user => {
        if(user) {
            return res.status(400).json({
                msg: 'Username already taken'
            })
        }
    })
    // Check for the unique email
    User.findOne({email: email}).then(user => {
        if(user) {
            return res.status(400).json({
                msg: 'Email is already registered'
            })
        }
    })
    // Everything is fine
    let newUser = new User({
        name,
        username,
        email,
        password
    });
    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    succes: true,
                    msg: 'User is now registred'
                });
            });
        });
    });
})

module.exports = router;