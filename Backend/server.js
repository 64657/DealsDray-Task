// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require("path");
const dotenv = require('dotenv');
const Employee =  require('./employeeModel')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const DB_URL = process.env.DB_URL;
// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log('MongoDB connection established successfully');
// });
mongoose
  .connect(DB_URL, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB", err));



// Routes
// Get all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new employee
app.post('/api/employees', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update employee
app.put('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete employee
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});