const sql = require("./db.js");
const bcrypt = require("bcryptjs");
const { add } = require("nodemon/lib/rules");
// constructor for the customer object
const Address = function (address) {
  this.streetName = address.streetName;
  this.streetNumber = address.streetNumber;
  this.province = address.province;
  this.country = address.country;
  this.postalcode = address.postalcode;
  this.sellerID = address.sellerID || null;
  this.customerID = address.customerID || null;
};

Address.create = (address, result) => {
  //console.log(temp);
  sql.query("INSERT INTO address SET ?", address, (err, res) => {
    if (err) {
      console.log("Error: ", err.code);
      result(err, null);
      return;
    }

    //console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { ...address });
  });
};

Address.UpdateAddress = (address, result) => {
  // if ("sellerID" in req) console.log("sellerID");
  let queryID;
  "sellerID" in address ? (queryID = "sellerID") : (queryID = "customerID");
  const queryValue = address[queryID];
  console.log(
    `UPDATE address SET streetNumber="${address.streetNumber}", streetName="${address.streetName}", province="${address.province}", country="${address.country}", postalcode="${address.postalcode}" WHERE "${queryID}" =${queryValue};`
  );
  sql.query(
    `UPDATE address SET streetNumber="${address.streetNumber}", streetName="${address.streetName}", province="${address.province}", country="${address.country}", postalcode="${address.postalcode}" WHERE ${queryID} = ${queryValue};`,
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      return result(null, { message: "Updated successfully!" });
    }
  );
};

module.exports = Address;
