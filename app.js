const express = require('express');
const app = express();
const {connectDB,authMiddleware} = require('./db/connect');
require('dotenv').config();
const cors = require('cors');
const userRouter = require('./routes/user')

const corsOptions = require('./config/corsOptions');
const { requireAuth } = require('./middleware/authMiddleware');



app.use(cors(corsOptions));
app.use(express.json()); 




const port = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  req.token = token;
  next();
});

// In your server setup
app.use(userRouter);
app.use("/api/v1/auth",require('./routes/auth')) 
app.get('/api/config', (req, res) => {
  res.json({
    mongoURI: process.env.MONGO1,
    // Add any other configuration properties you need
  });
});

app.get('/',(req,res)=>{
  res.send('welcome home')
})


const start = async () => {
  try {
    await connectDB(process.env.MONGO1);

    // Use authMiddleware after connecting to the database
    app.use(authMiddleware);
    app.use('/api/v1/tasks',requireAuth, require('./routes/tasks'));

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();










