const sql = require("./db.js");

const Category = function (cat) {
  this.categoryName = cat.categoryName;
};

Category.create = (category, result) => {
  //console.log(temp);
  sql.query("INSERT INTO categories SET ?", category, (err, res) => {
    if (err) {
      console.log("Error: ", err.code);
      result(err, null);
      return;
    }

    result(null, { ...category });
  });
};

Category.getAll = (result) => {
  let query = "SELECT * FROM categories";

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

module.exports = Category;
