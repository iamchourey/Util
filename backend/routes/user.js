const express = require('express');
const User = require('../models/users');
const bcrypt =require('bcrypt');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const passwordResetToken = require('../models/reset-token');

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password,5).then(function(hash){
    const user = new User({
      username:req.body.username,
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message:"Enter Valid Credentials!"
        });
      });
  });
});

router.post("/login",(req,res,next) => {
  let fetchuser;
  User.findOne({username:req.body.username}).then(
    user => {
       if(!user){
         return res.status(401).json({
           message:"Enter Valid Username"
         });
       }
       fetchuser=user;
       return bcrypt.compare(req.body.password,user.password);
    })
    .then(result => {
      if(!result){
        return res.status(401).json({
          message:"Enter Valid Password"
        });
      }
       const token=jwt.sign(
         {username:fetchuser.username,userId:fetchuser._id},
        'this_should_be_very_long_and_secret',
       {expiresIn:"5h"}
       );
       res.status(200).json({
         token:token,
         expiresIn:18000,
         userId:fetchuser._id,
         username:fetchuser.username
       });
    })
    .catch(err => {
      return res.status(402).json({
        message:"Enter Valid Username and Password"
      });
    });
});

router.post('/req-reset-password',(req, res)=> {
  if (!req.body.email) {
  return res
  .status(500)
  .json({ message: 'Email is required' });
  }
  const user = User.findOne({
  email:req.body.email
  });
  if (!user) {
  return res
  .status(409)
  .json({ message: 'Email does not exist' });
  }
  var resettoken = new passwordResetToken({ _userId: user._id, resettoken: crypto.randomBytes(16).toString('hex') });
  resettoken.save(function (err) {
  if (err) { return res.status(500).send({ msg: err.message }); }
  passwordResetToken.find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();
  res.status(200).json({ message: 'Reset Password successfully.' });
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: 'vchourey804@gmail.com',
      pass: 'vvishalgmail5'
    }
  });
  var mailOptions = {
  to: req.body.email,
  from: 'vchourey804@gmail.com',
  subject: 'UTIL 2.0 Password Reset',
  text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
  'http://localhost:4200/response-reset-password/' + resettoken.resettoken + '\n\n' +
  'If you did not request this, please ignore this email and your password will remain unchanged.\n'
  }
  transporter.sendMail(mailOptions, (err, info) => {
  })
  })
  })

  router.post('/new-password',(req, res) => {
    passwordResetToken.findOne({ resettoken: req.body.resettoken }, function (err, userToken, next) {
      if (!userToken) {
        return res
          .status(409)
          .json({ message: 'Token has expired' });
      }

      User.findOne({
        email: userToken.email
      }, function (err, userEmail, next) {
        if (!userEmail) {
          return res
            .status(409)
            .json({ message: 'User does not exist' });
        }
        return bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
          if (err) {
            return res
              .status(400)
              .json({ message: 'Error hashing password' });
          }
          userEmail.password = hash;
          userEmail.save(function (err) {
            if (err) {
              console.log(err);
              return res
                .status(400)
                .json({ message: 'Password can not reset.' });
            } else {
              userToken.remove();
              return res
                .status(201)
                .json({ message: 'Password reset successfully' });
            }

          });
        });
      });

    })
}
)

  router.post('/valid-password-token',(req, res)=> {
    if (!req.body.resettoken) {
      console.log(req.body.resettoken);
    return res
    .status(500)
    .json({ message: 'Token is required' });
    }
    const user = passwordResetToken.findOne({
    resettoken: req.body.resettoken
    });
    if (!user) {
    return res
    .status(409)
    .json({ message: 'Invalid URL' });
    }
    User.findOneAndUpdate({ email: user.email }).then(() => {
    res.status(200).json({ message: 'Token verified successfully.' });
    }).catch((err) => {
      console.log(err);
    return res.status(500).send({ msg: err.message });
    });
})


module.exports=router;
