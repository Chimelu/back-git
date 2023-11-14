const express = require('express');
const app = express();
const connectDB = require('./db/connect');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const corsOptions = require('./config/corsOptions')
app.use(bodyParser.json());


app.use(cors(corsOptions))





app.use(express.json())


 app.use('/api/v1/tasks',require('./routes/tasks'))
 const port = process.env.PORT || 5000;
 // Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});
// In your server setup
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
     app.listen(port, () =>
       console.log(`Server is listening on port ${port}...`)
     );
   } catch (error) {
     console.log(error);
   }
 };
 
start();











