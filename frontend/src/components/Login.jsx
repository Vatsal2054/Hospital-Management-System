import React from "react";
import Heading from './Heading';

function Login() {
  return (
    <div className="Login">
      <Heading content="Hospital Management System" class="Heading-head-name"/>
      <div className="Login-container-outer">
        <div className="Login-container-inner">
            <Heading content="Login to HMS" class="Login-Heading"/>
          <form className="Login-form" action="/newUser" method="post">
            <input
              className="Login-form-input item-margin"
              type="text"
              name="username"
              placeholder="Username"
            />
            <br />
            <input
              className="Login-form-input item-margin"
              type="password"
              name="password"
              placeholder="Password"
            />
            <div className="Login-form-dropdown item-margin">
              <select name="designation" id="dropdown">
                <option value="Nurse">Nurse</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>
            <button className="Login-form-button item-margin" type="submit">
              Login
            </button>
          </form>
        </div>
     </div>
    </div>
  );
}

export default Login;
