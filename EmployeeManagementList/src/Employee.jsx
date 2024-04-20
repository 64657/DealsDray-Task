import React ,{ useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "./App.css";

const EmployeeForm = ({ employees, setEmployees }) => {
  const navigate = useNavigate(); // Use useNavigate hook
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "HR",
    gender: "M",
    courses: [],
    image: "",
  });

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
      const response = await axios.post(
        "http://localhost:3001/api/employees",
        formData
      );
      setEmployees([...employees, response.data]);
      navigate("/employees");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full px-6  py-8 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Create Employee
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-md font-semibold mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-md font-semibold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block text-md font-semibold mb-2"
              >
                Mobile No:
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                pattern="[0-9]+"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="designation"
                className="block text-md font-semibold mb-2"
              >
                Designation:
              </label>
              <select
                id="designation"
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
            <div>
              <label className="block text-md font-semibold mb-2">
                Gender:
              </label>
              <div className="flex items-center space-x-4">
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
            </div>
            <div>
              <label className="block text-md font-semibold mb-2">
                Courses:
              </label>
              <div className="flex items-center space-x-4">
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
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-md font-semibold mb-2"
              >
                Image Upload:
              </label>
              <input
                type="file"
                id="image"
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
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
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

export default EmployeeForm;
