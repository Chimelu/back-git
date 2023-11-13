
const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  taskTittle: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [50, 'name can not be more than 20 characters'],
  },
  description:{
    type:String,
    required:true
  },
  tags: {
    type: String,
    enum:['urgent','important'],
    required:true
    
  }
 
})

module.exports = mongoose.model('Task', TaskSchema)
