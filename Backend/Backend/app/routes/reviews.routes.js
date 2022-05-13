const {
  findAll,
  create,
  findOne,
} = require("../controllers/review.controller");

const router = require("express").Router();

router.post("/createReview", create);
router.get("/allreviews", findAll);
router.get("/getreviews/:id", findOne);
module.exports = router;
