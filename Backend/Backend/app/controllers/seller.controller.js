const Seller = require("../models/seller.model.js");
const bcrypt = require("bcryptjs");
const sql = require("../models/db.js");

// Create and Save a new Customer
exports.create = async (req, res) => {
  // Validate request
  const { email, password, description, fullname, category } = req.body;
  if (!email || !password || !description || !fullname || !category) {
    return res.status(400).send({
      message: "All fields are required!",
    });
  }
  const hashPass = await bcrypt.hash(req.body.password, 12);

  // Create a customer
  const seller = new Seller({
    email: req.body.email,
    password: hashPass,
    description: req.body.description,
    fullname: req.body.fullname,
    category: req.body.category,
  });

  // Save customer in the database
  Seller.create(seller, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the Customer.",
      });
    else res.status(200).send(data);
  });
};

// Retrieve all sellers from the database (with condition).
exports.findAll = (req, res) => {
  Seller.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    else res.send(data);
  });
};

// Find a single seller by Id
exports.findOne = (req, res) => {
  Seller.findById(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

//registration
exports.register = async (req, res, next) => {
  try {
    const row = sql.query("SELECT `email` FROM `seller` WHERE `email`=?", [
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
      "INSERT INTO `seller`(`email`,`password`, `fullname`, `description`, `category`) VALUES(?,?,?,?)",
      [
        req.body.email,
        hashPass,
        req.body.fullname,
        req.body.description,
        req.body.category,
      ]
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

//get the address

exports.retrieveAddress = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Seller.getAddress(req.params.id, (err, data) => {
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

// Find a single Customer by Id
exports.Login = (req, res) => {
  console.log(req.body);
  Seller.LoginUser(req.body, res);
};
