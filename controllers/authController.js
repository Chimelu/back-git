const User = require("../models/User");
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const newUser = async (req, res) => {
    try {
        if (!req.body.password) {
            return res.status(400).json({
                message: "Password is required",
                status: 1,
            });
        }

        const passwordString = String(req.body.password);
        const hashedPwd = await bcrypt.hash(passwordString, 10);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPwd,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);
       

        res.status(201).json({
            data: savedUser,
            message: "User created successfully",
            status: 0,
        });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ msg: err.message });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).json("Wrong credentials");
        }

        const passwordString = String(req.body.password);
        const match = await bcrypt.compare(passwordString, user.password);

        if (!match) {
            return res.status(401).json('Wrong credentials');
        }
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        const accessToken = jwt.sign({
            id: user._id,
            
        },process.env.JWT_SEC,{expiresIn:"3d"})

        res.status(200).json({
            message: "Login successful",
            status: 0,
            data: user,
            accessToken
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ msg: err.message });
    }
};

module.exports = { newUser, login };
