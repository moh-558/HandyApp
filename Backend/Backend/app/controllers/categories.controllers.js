const Category = require("../models/categories.models.js");

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a customer
  const category = new Category({
    categoryName: req.body.categoryName,
  });

  // Save customer in the database
  Category.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the Customer.",
      });
    else res.status(200).send(data);
  });
};

// Retrieve all customers from the database (with condition).
exports.findAll = (req, res) => {
  Category.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    else res.send(data);
  });
};
