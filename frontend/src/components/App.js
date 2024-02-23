import React from 'react';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './About';

function App() {
  return (
    <div className="root-child">
    {/* <Header /> */}
    <Login />
    <Router>
        <div>
          {/* <h1>Router Added</h1> */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
