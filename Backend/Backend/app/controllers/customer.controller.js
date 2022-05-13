const Customer = require("../models/customer.model.js");
const bcrypt = require("bcryptjs");
const sql = require("../models/db.js");

// Create and Save a new Customer
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const hashPass = await bcrypt.hash(req.body.password, 12);

  // Create a customer
  const customer = new Customer({
    email: req.body.email,
    password: hashPass,
    username: req.body.username,
    fullname: req.body.fullname,
  });

  // Save customer in the database
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the Customer.",
      });
    else res.status(200).send(data);
  });
};

// Retrieve all customers from the database (with condition).
exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    else res.send(data);
  });
};

// Find a single Customer by Id
exports.Login = (req, res) => {
  Customer.LoginUser(req.body, res);
};

// Update a Customer identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Customer.updateById(req.params.id, new Customer(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Customer with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.register = async (req, res, next) => {
  try {
    const row = sql.query("SELECT `email` FROM `customers` WHERE `email`=?", [
      req.body.email,
    ]);

    if (row.length > 0) {
      return res.status(201).json({
        message: "The E-mail already in use",
      });
    }

    const hashPass = await bcrypt.hash(req.body.password, 12);
    console.log(hashPass);
    const rows = sql.query(
      "INSERT INTO `customers`(`email`,`password`,`username`, `fullname`) VALUES(?,?,?,?)",
      [req.body.email, hashPass, req.body.username, req.body.fullname]
    );

    if (rows.affectedRows === 1) {
      return res.status(201).json({
        message: "The user has been successfully inserted.",
      });
    }
  } catch (err) {
    next(err);
  }
};

//get the customer address
exports.retrieveAddress = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Customer.getAddress(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Customer with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
