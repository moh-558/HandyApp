const router = require("express").Router();
const sql = require("../models/db.js");

router.post("/addreview", async (req, res) => {
  let { review, rate, uid, postid } = req.body;
  const reviewObject = {
    review,
    rate,
    uid,
    postid,
  };
  sql.query(
    `SELECT postid, uid FROM review WHERE postid = ${postid} AND uid = '${uid}'`,
    (err, result) => {
      if (result.length) {
        return res.send({ msg: "You submitted a review already" });
      }
      sql.query("INSERT INTO review SET ?", reviewObject, (err, result) => {
        if (err) {
          console.log("Error: ", err.code);
          res.status(400).send({ msg: "Error! While saving review." });
          return;
        }
        res.status(200).send({ review: reviewObject, msg: "success" });
      });
    }
  );
});

router.get("/reviews/:id", async (req, res) => {
  const id = req.params.id.toLowerCase();
  sql.query(
    `SELECT * FROM review WHERE postid = '${id}'`,
    async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(409).send({ msg: err });
      }
      res.status(200).send(result);
    }
  );
});

module.exports = router;
