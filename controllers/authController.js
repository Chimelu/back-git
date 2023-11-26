const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config')
const jwtSecret = process.env.JWT_SECRET;
const maxAgeInDays = 4;
const maxAgeMilliseconds = maxAgeInDays * 24 * 60 * 60 * 1000;

const newUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({
                message: "User with the provided username or email already exists",
                status: 1,
            });
        }

        if (!password) {
            return res.status(400).json({
                message: "Password is required",
                status: 1,
            });
        }
 
        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPwd,
        });

        const savedUser = await newUser.save();

        // Generate a new JWT token for the user
        const accessToken = jwt.sign(
            { id: savedUser._id },
            jwtSecret,
            { expiresIn: "3d" }
        );

        // Send the token in the response
        res.cookie('jwt', accessToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: maxAgeMilliseconds });

        res.status(201).json({
            data: savedUser,
            message: "User created successfully",
            status: 0,
            accessToken,
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: 'Validation failed', details: error.errors });
        } else {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
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
          
        const accessToken = jwt.sign(
            { id: user._id },
            jwtSecret,
            { expiresIn: "3d" }
    );
    res.cookie('jwt',accessToken,{httpOnly:true, sameSite:'None', secure: true,maxAge:maxAgeMilliseconds})

        res.status(200).json({
            message: 'Login successful',
            status: 0,
            data: user,
            accessToken
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
