const Task = require('../models/Task')

// list out all task
const getAllTasks =async (req,res)=>{
    try{
        const tasks = await Task.find({})
        res.status(200).json({tasks})


    }catch(err){
        res.status(500).json({msg: err});
    }
   
   
} 


// create a new task
const createTask= async (req,res)=>{
    try{
        const task = await Task.create(req.body)
        res.status(201).json({task})

    }catch(err){
        console.error('Error creating task:', err);
        res.status(500).json({msg: err})
    }
   
}

const getTask = async (req, res) => {
    try {
      const { id: taskID } = req.params;
      const task = await Task.findOne({ _id: taskID });
  
      if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
      }
  
      res.status(200).json({ task });
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  };
  

// edit a task
const updateTask = async (req, res) => {
    try {
      const { id: taskID } = req.params;
      const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true });
  
      if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
      }
  
      res.status(200).json({ task });
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  };
  

const deleteTask=async(req,res)=>{
    try{
        const{id:taskID}=req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        res.status(200).json({task})

    } catch(err){
        console.error('Error deleting task:', err);
        res.status(500).json({msg: err})

    }
   
}

module.exports = {getAllTasks,createTask,getTask,updateTask,deleteTask}