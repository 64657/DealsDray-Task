// Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  courses: { type: [String], default: [] },
  image: { type: String },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
