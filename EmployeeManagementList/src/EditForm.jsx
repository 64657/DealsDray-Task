import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios library
import Header from "./Header";

const EditForm = ({ employees, setEmployees }) => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "HR",
    gender: "M",
    courses: [],
    image: "",
  });

  // Fetch the employee data by ID when the component mounts
  useEffect(() => {
    const employee = employees.find((emp) => emp._id === id);
    if (employee) {
      setFormData({ ...employee });
    }
  }, [employees, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((course) => course !== value),
      }));
    } else if (type === "file") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: reader.result, // Set the image URL to the base64 data URL
        }));
      };
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Client-side numeric validation for mobile
    const mobileRegex = /^\d{10}$/; // Exactly 10 digits
    if (!mobileRegex.test(formData.mobile)) {
      alert("Mobile number should be exactly 10 digits long.");
      return;
    }
    try {
      await axios.put(`http://localhost:3001/api/employees/${id}`, formData); // Send PUT request to update employee
      const updatedEmployees = employees.map((emp) =>
        emp._id === id ? { ...formData } : emp
      );
      setEmployees(updatedEmployees);
      navigate("/employees");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full  px-6 py-8 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Edit Employee</h1>
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="mb-4">
              <label className="block text-md font-semibold mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold mb-2">
                Mobile No:
              </label>
              <input
                type="text"
                name="mobile"
                pattern="[0-9]+"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold mb-2">
                Designation:
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              >
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold mb-2">
                Gender:
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  checked={formData.gender === "M"}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  checked={formData.gender === "F"}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />{" "}
                Female
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold mb-2">
                Courses:
              </label>
              <label>
                <input
                  type="checkbox"
                  name="courses"
                  value="MCA"
                  checked={formData.courses.includes("MCA")}
                  onChange={handleChange}
                  className="mr-2"
                />{" "}
                MCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="courses"
                  value="BCA"
                  checked={formData.courses.includes("BCA")}
                  onChange={handleChange}
                  className="mr-2"
                />{" "}
                BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="courses"
                  value="BSC"
                  checked={formData.courses.includes("BSC")}
                  onChange={handleChange}
                  className="mr-2"
                />{" "}
                BSC
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold mb-2">
                Image Upload:
              </label>
              <input
                type="file"
                name="image"
                accept=".jpg,.png"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditForm;
