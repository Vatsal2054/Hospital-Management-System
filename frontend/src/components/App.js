import React from 'react';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './About';
import NurseMenu from './NurseMenu';
import AdminMenu from './AdminMenu';
import DoctorMenu from './DoctorMenu';
import ReceptionistMenu from './ReceptionistMenu';

function App() {
  return (
    <div className="root-child">
    {/* <Header /> */}
    {/* <Login nurse_redirect = {redirect_to_nurse}/> */}
    <Router>
        <div>
          {/* <h1>Router Added</h1> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/NurseMenu" element={<NurseMenu />} />
            <Route path="/AdminMenu" element={<AdminMenu />} />
            <Route path="/ReceptionistMenu" element={<ReceptionistMenu />} />
            <Route path="/DoctorMenu" element={<DoctorMenu />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
