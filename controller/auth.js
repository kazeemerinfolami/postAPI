const User = require("../models/user");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const expressJWT = require("express-jwt");
require("dotenv").config();

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  //if signup email is found in the dataBase send err
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email has been taken",
      });
    }
    const newUser = new User({ name, email, password });
    newUser.save((err, user) => {
    if (err) {
      console.log("SAVE USER ERROR", err);
      return res.status(401).json({
        error: err,
      });
    }
    return res.json({
      user,
      message: "Signup success. Please signin.",
    });
  });
  })
  
  
// }catch(err){
//   console.log("code is: ", err.code);
//   return res.status(422).send(err.message);

};


//..............................SIGNIN....................

exports.signin = (req, res) => {
  const { email, password } = req.body;
  //to check if a user exist while signing up
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      //if email don't match any in the dataBase
      return res.status(400).json({
        error: "User with that email does not exist. please signup",
      });
    } //else
    // if email match but password is wrong....this will be checked @model
    //remember password has been hashed @models @methods @ if authenticate = hashed_password then this will be true/ false
    //matching the password provided by the use with the hashed password in the database
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    } //else
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    const { _id, name, email, role } = user; //what will be gotten from the database

    return res.json({
      token,
      user: { _id, name, email, role },
    });
  }); //serves as middleWare and can easily extract user data from the token
};

// makes only the user/ logged in client access his account
exports.requireSignIn = expressJWT({
  secret: process.env.SECRET,
});

