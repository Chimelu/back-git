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


// create a new task
const createTask = async (req, res) => {
  try {
    // Assuming the user information is attached to req.user by authMiddleware
    const userId = req.user.id;
    
    // Add user information to the task data
    const taskData = { ...req.body, user: userId };

   
    const task = await Task.create(taskData);

    res.status(201).json({ task });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ msg: err.message });
  }
};


const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    
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