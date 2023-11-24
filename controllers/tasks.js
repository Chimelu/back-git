const Task = require('../models/Task')

// list out all task
const getAllTasks =async (req,res)=>{
    try{
      const tasks = await Task.find({ user: req.user.id });
        res.status(200).json({tasks})


    }catch(err){
        res.status(500).json({msg: err});
    }
   
   
} 


const jwt = require('jsonwebtoken');


const createTask = async (req, res) => {
  try {
    // Get user ID from the decoded JWT
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    const userId = decoded.id;

    // Create task with user ID
    const task = await Task.create({ ...req.body, user: userId });
    res.status(201).json({ task });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ msg: err });
  }
};

module.exports = { createTask };



const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    
    // Ensure that the task belongs to the signed-in user
    const task = await Task.findOne({ _id: taskID, user: req.user.id });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    
    // Ensure that the task belongs to the signed-in user
    const task = await Task.findOneAndUpdate(
      { _id: taskID, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    // Ensure that the task belongs to the signed-in user
    const task = await Task.findOneAndDelete({ _id: taskID, user: req.user.id });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ msg: err });
  }
};

module.exports = {getAllTasks,createTask,getTask,updateTask,deleteTask}