const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config')
const jwtSecret = process.env.JWT_SECRET;

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

        res.status(201).json({
            data: savedUser,
            message: "User created successfully",
            status: 0,
        });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Wrong credentials" });
        }

        const isPasswordValid = await bcrypt.compare(String(password), user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Wrong credentials" });
        }
        console.log('JWT_SECRET:', process.env.JWT_SECRET);    
    //     const accessToken = jwt.sign(
    //         { id: user._id },
    //         jwtSecret,
    //         { expiresIn: "3d" }
    // );

        res.status(200).json({
            message: 'Login successful',
            status: 0,
            data: user,
            
          });
        } catch (jwtError) {
            console.error('JWT Signing Error:', jwtError);
        
            // Send a more informative error response
            res.status(500).json({
                message: 'Internal Server Error',
                status: 1,
                error: jwtError.message,  // Include the JWT signing error message for debugging
            });
        }
      
};


module.exports = { newUser, login };
