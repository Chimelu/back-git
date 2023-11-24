const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo'); 
require("dotenv").config()

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
}; 

const authMiddleware = session({
  secret: process.env.SESSION_SECRET || 'your-fallback-secret-key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO1, 
    collection: 'sessions',
  }),
}); 

module.exports = { connectDB,authMiddleware };
