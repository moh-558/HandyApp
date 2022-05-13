const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const customerRoutes = require("./app/routes/customer.routes.js");
const sellerRoutes = require("./app/routes/seller.routes.js");
const reviewsRoutes = require("./app/routes/reviews.routes.js");
const addressRoutes = require("./app/routes/address.routes.js");
const categoriesRoutes = require("./app/routes/categories.routes.js");
const users = require("./app/routes/registerUser.js");
const reviews = require("./app/routes/reviews");

const app = express();
//*********************//
app.use(cors());
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Handy App application." });
});
app.use("/customers", customerRoutes);
app.use("/sellers", sellerRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/address", addressRoutes);
app.use("/categories", categoriesRoutes);
app.use("/users", users);
app.use("/reviews", reviews);
// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
