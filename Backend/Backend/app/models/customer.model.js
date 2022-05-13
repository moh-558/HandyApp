const sql = require("./db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// constructor for the customer object
const Customer = function (customer) {
  this.email = customer.email;
  this.password = customer.password;
  this.username = customer.username;
  this.fullname = customer.fullname;
};

Customer.create = (newCustomer, result) => {
  var temp = sql.query("SELECT `email` FROM `customers` WHERE `email` = ?", [
    newCustomer.email,
  ]);
  //console.log(temp);
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("Error: ", err.code);
      result(err, null);
      return;
    }

    //console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { ...newCustomer });
  });
};

Customer.getAll = (result) => {
  let query = "SELECT * FROM customers";

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

Customer.findById = (user, result) => {
  //const passMatch = await bcrypt.compare(user.password, res[0].password);
  sql.query(
    `SELECT * FROM customers WHERE email = "${user.email}";`,
    async (err, res) => {
      if (err) {
        return result(err, null);
      }
      const passMatch = await bcrypt.compare(user.password, res[0].password);
      if (!passMatch) {
        return result({ message: "Password does not match" }, null);
      }

      if (res.length) {
        result(null, res[0]);

        return;
      }
      // not found customer with the id
      // result({ kind: "not_found" }, null);
    }
  );
};
//update a customer by id
Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET email = ?, fullname = ?, username = ?, password = ? WHERE email = ?",
    [
      customer.email,
      customer.fullname,
      customer.username,
      customer.password,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Customer.getAddress = (id, result) => {
  sql.query(
    `SELECT streetNumber, streetName, province, country, postalcode FROM address  WHERE customerID ="${id}"`,
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

Customer.LoginUser = (user, res) => {
  sql.query(
    `SELECT * FROM customers WHERE email = "${user.email}";`,
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

module.exports = Customer;
