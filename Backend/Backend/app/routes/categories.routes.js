const { findAll, create } = require("../controllers/categories.controllers");

const router = require("express").Router();

router.get("/getAll", findAll);
router.post("/createNew", create);
module.exports = router;
