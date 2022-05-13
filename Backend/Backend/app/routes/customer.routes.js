const router = require("express").Router();

const {
  findAll,
  create,
  update,
  retrieveAddress,
  Login,
} = require("../controllers/customer.controller.js");
const userMiddleware = require("../middleware/users.js");

router.get("/getAll", findAll);
router.post("/signup", userMiddleware.validateRegister, create);
//get address
router.get("/address/:id", retrieveAddress);
// Retrieve a single Customer with id
router.post("/login", Login);
// Update a Customer with id
router.put("/:id", update);
module.exports = router;
