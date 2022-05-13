const sql = require("./db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// constructor for the customer object
const Seller = function (seller) {
  this.category = seller.category;
  this.password = seller.password;
  this.fullname = seller.fullname;
  this.description = seller.description;
  this.email = seller.email;
};

Seller.create = (seller, result) => {
  sql.query(
    `SELECT email FROM seller WHERE email = '${seller.email}'`,
    (err, response) => {
      if (response.length) {
        return result({ message: "Email already is in use" }, null);
      } else {
        sql.query("INSERT INTO seller SET ?", seller, (err, res) => {
          if (err) {
            console.log("Error: ", err.code);
            result(err, null);
            return;
          }
          result(null, { ...seller });
        });
      }
    }
  );

  //console.log(temp);
};

Seller.getAll = (result) => {
  let query = "SELECT * FROM seller";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("customers: ", res);
    result(null, res);
  });
};

//find by id
Seller.findById = (user, result) => {
  console.log(user);
  sql.query(
    `SELECT * FROM seller WHERE email = "${user.email}"`,
    async (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      const passMatch = await bcrypt.compare(user.password, res[0].password);
      if (!passMatch) {
        result(err, null);
      }

      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found customer with the id
      // result({ kind: "not_found" }, null);
    }
  );
};

//get the address
Seller.getAddress = (id, result) => {
  sql.query(
    `SELECT streetNumber, streetName, province, country, postalcode FROM address  WHERE sellerID ="${id}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("found customer: ", res);
      result(null, res);
      return;

      // not found customer with the id
      // result({ kind: "not_found" }, null);
    }
  );
};

Seller.LoginUser = (user, res) => {
  sql.query(
    `SELECT * FROM seller WHERE email = "${user.email}";`,
    (err, result) => {
      // user does not exists
      if (err) {
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Email or password is incorrect!",
        });
      }
      // check password
      bcrypt.compare(user.password, result[0]["password"], (bErr, bResult) => {
        // wrong password
        if (bErr) {
          return res.status(401).send({
            msg: "Email or password is incorrect!",
          });
        }
        if (bResult) {
          const token = jwt.sign(
            { id: result[0] },
            "the-super-strong-secrect",
            { expiresIn: "1h" }
          );

          return res.status(200).send({
            msg: "Logged in!",
            token,
            user: result[0],
          });
        }
        return res.status(401).send({
          msg: "Username or password is incorrect!",
        });
      });
    }
  );
};

module.exports = Seller;
