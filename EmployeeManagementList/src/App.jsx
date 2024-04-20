
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import EmployeeList from './EmployeeList';
import EmployeeForm from './Employee';
import EditForm from './EditForm'; // Import the EditForm component
import Login from './Login';
import Welcome from './Welcome';

const App = () => {
  const [employees, setEmployees] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/employeeform" element={<EmployeeForm employees={employees} setEmployees={setEmployees} />} />
        <Route path="/employees" element={<EmployeeList employees={employees} setEmployees={setEmployees} />}/>
        <Route path="/edit/:id" element={<EditForm employees={employees} setEmployees={setEmployees} />} />
      </Routes>
    </Router>
  );
};

export default App;