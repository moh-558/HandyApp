// middleware/users.js

const jwt = require("jsonwebtoken");

module.exports = {
  validateRegister: (req, res, next) => {
    // username min length 3
    if (!req.body.username || req.body.username.length < 3) {
      return res.status(400).send({
        msg: "Please enter a username with minimum 3 characters long",
      });
    }

    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: "Please enter a password with minimum 3 characters long",
      });
    }

    // email
    if (!req.body.email) {
      return res.status(400).send({
        msg: "Email is required",
      });
    }
    //full name
    if (!req.body.fullname) {
      return res.status(400).send({
        msg: "Name is required",
      });
    }

    next();
  },

  validateSeller: (req, res, next) => {
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: "Please enter a password with minimum 3 characters long",
      });
    }

    // email
    if (!req.body.email) {
      return res.status(400).send({
        msg: "Email is required",
      });
    }
    //full name
    if (!req.body.fullname) {
      return res.status(400).send({
        msg: "Name is required",
      });
    }

    if (!req.body.description) {
      return res.status(400).send({
        msg: "description is required",
      });
    }

    if (!req.body.category) {
      return res.status(400).send({
        msg: "category is required",
      });
    }
    next();
  },
};
