import React,{ useState, useEffect } from "react";
import axios from "axios"; // Import Axios library
import { Link } from "react-router-dom";
import Header from "./Header";

const EmployeeList = ({ employees, setEmployees }) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    setEmployeeCount(employees.length);
  }, [employees]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://dealsdray-task.onrender.com/api/employees");
        setEmployees(response.data); // Update employees state with fetched data
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [setEmployees]);

  const renderImage = (employee) => {
    if (employee.image) {
      return (
        <img
          src={employee.image}
          alt={employee.name}
          className="h-10 w-10 object-cover rounded-full"
        />
      );
    }
    return null;
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Invalid employee ID");
      return;
    }


    try {
      const response = await axios.delete(
        `https://dealsdray-task.onrender.com/api/employees/${id}`
      );
      if (response.status === 200) {
        const updatedEmployees = employees.filter(
          (employee) => employee._id !== id
        );
        setEmployees(updatedEmployees);
        setConfirmDeleteId(null);
      } else {
        console.error("Failed to delete employee:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting employee:", error.message);
    }
  };

  // // Static employee data
  // const staticEmployees = [
  //   { id: 1, name: 'John Doe', email: 'john@example.com', mobile: '1234567890', designation: 'HR', gender: 'M', courses: ['MCA'], image: null },
  //   { id: 2, name: 'Jane Smith', email: 'jane@example.com', mobile: '9876543210', designation: 'Manager', gender: 'F', courses: ['BCA'], image: null },
  // ];

  // // Combine static and dynamic employees
  // const allEmployees = [...staticEmployees, ...employees];
  // const allEmployees = [...employees];
  const allEmployees = employees.map((employee) => ({
    ...employee,
    id: employee._id,
  }));

  const filteredEmployees = allEmployees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <h1 className="text-3xl font-bold">Employee List</h1>
            <p className="text-sm text-gray-500">{employeeCount} Employees</p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="absolute right-0 top-0 bottom-0 flex items-center px-3 bg-gray-100 rounded-r-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-8a1 1 0 11-2 0 1 1 0 012 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 border border-gray-300">Sl no</th>
              <th className="px-6 py-3 border border-gray-300">Image</th>
              <th className="px-6 py-3 border border-gray-300">Name</th>
              <th className="px-6 py-3 border border-gray-300">Email</th>
              <th className="px-6 py-3 border border-gray-300">Mobile</th>
              <th className="px-6 py-3 border border-gray-300">Designation</th>
              <th className="px-6 py-3 border border-gray-300">Gender</th>
              <th className="px-6 py-3 border border-gray-300">Courses</th>
              <th className="px-6 py-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr
                key={`${employee._id}-${employee.name}-${employee.email}-${index}`}
                className="hover:bg-gray-100"
              >
                <td className="px-6 py-4 border border-gray-300">
                  {index + 1}
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  {renderImage(employee)}
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  <Link
                    to={`/edit/${employee._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {employee.name}
                  </Link>
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  {employee.email}
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  {employee.mobile}
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  {employee.designation}
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  {employee.gender}
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  {employee.courses.join(", ")}
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  {/* Edit button */}
                  <Link
                    to={`/edit/${employee._id}`}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </Link>
                  {/* Delete button */}
                  {confirmDeleteId === employee._id ? (
                    <div>
                      <p>Are you sure you want to delete?</p>
                      <button
                        onClick={() => confirmDelete(employee._id)}
                        className="text-red-500 hover:underline mr-2"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="text-gray-500 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <Link
            to="/employeeform"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add Employee
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;