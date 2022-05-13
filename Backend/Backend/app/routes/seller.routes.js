const { register } = require("../controllers/customer.controller");
const {
  create,
  findAll,
  findOne,
  retrieveAddress,
  Login,
} = require("../controllers/seller.controller");
const userMiddleware = require("../middleware/users.js");

const router = require("express").Router();
router.get("/address/:id", retrieveAddress);
router.post("/login", Login);
router.post("/signup", userMiddleware.validateSeller, create);
router.get("/getAll", findAll);
router.get("/:id", findOne);

module.exports = router;
