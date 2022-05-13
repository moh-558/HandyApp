const bcrypt = require("bcryptjs");
const sql = require("../models/db.js");

exports.register = async (req, res) => {
  try {
    const row = sql.query("SELECT 'email' FROM 'customers' WHERE 'email'=?", [
      req.body.email,
    ]);

    if (row.length > 0) {
      return res.status(201).json({
        message: "The E-mail already in use",
      });
    }

    const hashPass = await bcrypt.hash(req.body.password, 12);

    const rows = sql.query(
      "INSERT INTO 'customers'('email','password','username', 'fullname') VALUES(?,?,?,?)",
      [req.body.email, hashPass, req.body.username, req.body.fullname]
    );

    if (rows.affectedRows === 1) {
      return res.status(201).json({
        message: "The user has been successfully inserted.",
      });
    }
  } catch (err) {
    //next(err);
  }
};
