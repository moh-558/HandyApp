const router = require("express").Router();
const bcrypt = require("bcryptjs");
const sql = require("../models/db.js");

router.post("/newuser", async (req, res) => {
  let { username, password, email, address, imageURL, uid, usertype } =
    req.body;

  //check if the user already exists
  sql.query(
    "SELECT `email` FROM `users` WHERE `email` = ?",
    [email],
    async (err, result) => {
      if (result.length) {
        return res
          .status(409)
          .send({ msg: "user with the same email exists." });
      } else {
        //user is new user
        password = await bcrypt.hash(password, 12);
        const user = {
          address,
          password,
          email,
          imageURL,
          uid,
          username,
          usertype,
        };
        console.log(user);
        //insert into the database.
        sql.query("INSERT INTO users SET ?", user, (err, result) => {
          if (err) {
            console.log("Error: ", err.code);
            res
              .status(400)
              .send({ msg: "Error while inserting into users table" });
            return;
          }
          res.status(200).send({ user: user, msg: "success" });
        });
      }
    }
  );
});

router.get("/getall", async (req, res) => {
  sql.query("SELECT * FROM users", async (err, result) => {
    if (err) {
      return res.status(409).send({ msg: err });
    }
    res.status(200).send(result);
  });
});
//insert into the data table

router.post("/newdata", async (req, res) => {
  //get all the fields from the request object
  let { category, price, skills, username, description, uid } = req.body;

  const data = {
    category,
    price,
    skills,
    username,
    description,
    uid,
  };
  //insert the fields into the table
  sql.query("INSERT INTO data SET ?", data, (err, result) => {
    if (err) {
      console.log("Error: ", err.code);
      res.status(400).send({ msg: "Error while inserting into users table" });
      return;
    }
    res.status(200).send({ data: data, msg: "success" });
  });
});

router.get("/data/:id", async (req, res) => {
  const id = req.params.id;
  sql.query(`SELECT * FROM data WHERE id = ${id}`, async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(409).send({ msg: err });
    }
    res.status(200).send(result);
  });
});

router.get("/categories/:category", async (req, res) => {
  const category = req.params.category.toLowerCase();
  sql.query(
    `SELECT * FROM data WHERE category = '${category}'`,
    async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(409).send({ msg: err });
      }
      res.status(200).send(result);
    }
  );
});
//get by category field

router.get("/getalldata", async (req, res) => {
  sql.query("SELECT * FROM data", async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(409).send({ msg: err });
    }
    res.status(200).send(result);
  });
});
router.get("/search/:username", async (req, res) => {
  const username = req.params.username.toLowerCase();
  sql.query(
    `SELECT username FROM data where username = '${username}'`,
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
