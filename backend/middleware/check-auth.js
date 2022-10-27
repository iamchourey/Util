const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{
  try{
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken= jwt.verify(token,'this_should_be_very_long_and_secret');
  req.userData={username:decodedToken.username,userId:decodedToken.userId};
  next();
  }
  catch(error){
    console.log(error)
    res.status(403).json({
      message:"AUTH FAILED"
    })
  }
}
