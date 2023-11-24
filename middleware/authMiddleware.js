
const jwt = require('jsonwebtoken');
const  User  = require('../models/User'); 
require('dotenv').config()


const verifyJWT = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.sendStatus(401)
    console.log(authHeader);
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err,user)=>{
            if(err) return res.sendStatus(403)
            req.user= user
            next()
        }
    )


}

const requireAuth = async (req, res, next) => {
  verifyJWT(req, res, async () => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.user = user; // Attach the user to the request object
      next(); // Continue to the next middleware or route handler
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  });
};

module.exports = { requireAuth,verifyJWT };
