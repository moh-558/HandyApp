const Address = require("../models/address.models.js");

const sql = require("../models/db.js");

// Create and Save a new Customer
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a customer
  const address = new Address({
    streetNumber: req.body.streetNumber,
    streetName: req.body.streetName,
    province: req.body.province,
    country: req.body.country,
    postalcode: req.body.postalcode,
    sellerID: req.body.sellerID,
    customerID: req.body.customerID,
  });

  // Save customer in the database
  Address.create(address, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the Customer.",
      });
    else res.status(200).send(data);
  });
};

// Retrieve all customers from the database (with condition).
exports.findAll = (req, res) => {
  Address.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Address.UpdateAddress(req.body, (err, data) => {
    //console.log(req.body);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer.`,
        });
      } else {
        res.status(500).send({
          message: err.message,
        });
      }
    } else {
      res.send(data);
    }
  });
};
