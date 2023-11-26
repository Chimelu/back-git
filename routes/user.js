// routes/user.js

const express = require('express');
const router = express.Router();
const {verifyJWT, requireAuth} = require('../middleware/authMiddleware');
const { deleteUser, updatedUser,  getAllUsers, getUser } = require('../controllers/User');

router.put('/api/v1/user', verifyJWT, (req, res) => {
  updatedUser(req, res);
});

router.delete('/api/v1/user', requireAuth, (req, res) => {
  deleteUser(req, res);
});

router.get('/api/v1/user/:id', requireAuth, 
  getUser
)

router.get('/api/v1/users', verifyJWT, (req, res) => {
  getAllUsers(req, res);
});

module.exports = router;
