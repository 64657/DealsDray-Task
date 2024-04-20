import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header'; // Import the Header component

const Welcome = () => {
    // Assume you have a way to get the admin's name
    const adminName = "Admin";
  
    return (
      <>
        <Header /> {/* Add the Header component here */}
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Welcome {adminName}</h1>
            <Link to="/employees" className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Go to Employees</Link>
          </div>
        </div>
      </>
    );
};

export default Welcome;
