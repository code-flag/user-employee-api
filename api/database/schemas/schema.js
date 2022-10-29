const mongoose = require("mongoose");

/** ___________________________PAYEE PERSONAL INFO________________________ */

const UserRegisteration = mongoose.Schema({
  name:{type: String, required: true},
  email:{type: String, required: true},
  password:{type: String, required: true},
});

/** ___________________________PAYEE BANK DETAILS_________________________ */

const EmployeeSchema = mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true},
  gender: {type: String},
  salary: {type: Number }
});

Users = mongoose.model("Users", UserRegisteration);
Employee = mongoose.model("Employees", EmployeeSchema);

module.exports = {Users, Employee};
