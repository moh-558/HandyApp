const {
  findAll,
  create,
  update,
} = require("../controllers/address.controller");

const router = require("express").Router();
router.get("/getAll", findAll);
router.post("/createNew", create);
router.put("/updateaddress", update);
module.exports = router;
