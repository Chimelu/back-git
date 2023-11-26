   
const allowedOrigins = require("./allowedOrigin");

const corsOptions = {
  // origin parameter is whoever requested (ex: google.com)
  origin: (origin, callback) => {
 
    if (!origin || allowedOrigins.includes(origin)) {
      
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  Credential: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;