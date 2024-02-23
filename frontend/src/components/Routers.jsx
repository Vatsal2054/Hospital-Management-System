import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import About from './About';

function Routers(){
    return (
      <Router>
        <div>
          <h1>Router Added</h1>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    );
}

export default Routers;