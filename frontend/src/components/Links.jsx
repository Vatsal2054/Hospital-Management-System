import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';

function Links() {
    return (
      <Router>
        <div className="Header-links">
          <nav>
            <ul className="Header-link-list">
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
        </div>
      </Router>
    )
}

export default Links;