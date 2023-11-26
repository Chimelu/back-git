require('dotenv').config()
const bcrypt = require('bcrypt');
const User = require("../models/User");
const Task = require('../models/Task')

const updatedUser = async(req,res)=>{
    if(req.body.password){
        const passwordString = String(req.body.password);
        const hashedPwd = await bcrypt.hash(passwordString, 10);

    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true})
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)

    }
}

const deleteUser = async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted")

    }catch(err){
        res.status(500).json(err)


    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        const tasks = await Task.find({ user: userId });

        // User found, send a 200 status code with the user data
        res.status(200).json(user);
    } catch (err) {
        // Internal server error
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


const getAllUsers = async (req,res)=>{
    try{
        const users =  await User.find()
        res.status(200).json(users)

    }catch(err){
        res.status(500).json(err)
    }
}


module.exports ={updatedUser,deleteUser, getUser,getAllUsers} 