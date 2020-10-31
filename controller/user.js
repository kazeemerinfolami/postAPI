const User = require("../models/user");
//can fetch the user info from the front end
exports.read = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    //to get the user info without hashedPassword and salt
    user.hashed_Password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

exports.update = (req, res) => {
  //console.log("UPDATE USER", req.user, "UPDATE DATA", req.body);
  const { name, password } = req.body;
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      res.status(400).json({ error: "User not found" });
    } //Create a validation for the authUser when making an update on their profileData
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    } else {
      user.name = name;
    }
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: "Password should be min 6 characters long",
        });
      } else {
        user.password = password;
      }
    }
    user.save((err, updatedUser) => {
      if (err) {
        console.log("user update error", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      updatedUser.hashed_Password = undefined;
      updatedUser.salt = undefined;
      res.json(updatedUser);
    });
  });
};

exports.remove = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.remove((err, delUser) => {
    if (err) {
      return res.status(400).json({
        error: 'User not found'
      })
    }
    res.json({
      message: 'User deleted successfully'
    })
  })
  });
  
};