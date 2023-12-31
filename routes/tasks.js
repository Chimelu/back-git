const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/tasks');
const { verifyJWT, requireAuth } = require('../middleware/authMiddleware');

// Apply verifyJWT middleware to routes that need authentication
router.use(requireAuth);

// Routes with authentication
router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
