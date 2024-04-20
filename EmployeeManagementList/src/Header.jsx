import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold">Logo</div>
      <nav>
        <ul className="flex space-x-4">
          <li><Link to="/welcome">Home</Link></li>
          <li><Link to="/employees">Employee List</Link></li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <button onClick={handleLogout}>Logout</button> {/* Call handleLogout on button click */}
      </div>
    </header>
  );
};

export default Header;
