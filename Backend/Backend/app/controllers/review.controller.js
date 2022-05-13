const sql = require("../models/db.js");
const Review = require("../models/review.models.js");

// Create and Save a new review
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a review
  const review = new Review({
    customerID: req.body.customerID,
    sellerID: req.body.sellerID,
    description: req.body.description,
    score: req.body.score,
  });

  // Save review in the database
  Review.create(review, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the review.",
      });
    else res.status(200).send(data);
  });
};

// Retrieve all reviews from the database (with condition).
exports.findAll = (req, res) => {
  Review.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    else res.send(data);
  });
};

//reviews for specific seller

exports.findOne = (req, res) => {
  Review.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found reviews with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving reviews with id " + req.params.id,
        });
      }
    } else {
      res.send(data);
    }
  });
};
