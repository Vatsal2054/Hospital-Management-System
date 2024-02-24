import React, { useState } from "react";
import Heading from './Heading';
import '../sass/main.scss';

function Login() {

  const [credentials, setCredentials] = useState({
    username: "",
    password:"",
    designation:"",
  });

  function handleInput(e){
    const {name, value} = e.target;
    setCredentials((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  function handleDropdown(e){
    const post = e.target.value;
    setCredentials((preValue) => {
      return {
        ...preValue,
        designation: post,
      };
    });
  }

  function passToServer(){
    console.log(credentials);
  }

  function preventSubmit(e){
    e.preventDefault();
  }

  return (
    <div className="Login">
      <Heading content="Hospital Management System" class="Heading-head-name"/>
      <div className="Login-container-outer">
        <div className="Login-container-inner">
            <Heading content="Login to HMS" class="Login-Heading"/>
          <form className="Login-form" onSubmit={preventSubmit}>
            <input
              className="Login-form-input item-margin"
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleInput}
              value = {credentials.username}
            />
            <br />
            <input
              className="Login-form-input item-margin"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInput}
              value = {credentials.password}
            />
            <div className="Login-form-dropdown item-margin">
              <select onChange={handleDropdown} name="designation" id="dropdown" required>
                <option value="" disabled selected>Select Designation</option>
                <option name="designation" value="Nurse">Nurse</option>
                <option name="designation" value="Receptionist">Receptionist</option>
                <option name="designation" value="Doctor">Doctor</option>
              </select>
            </div>
            <button onClick={passToServer} className="Login-form-button item-margin" type="submit">
              Login
            </button>
          </form>
        </div>
     </div>
    </div>
  );
}

export default Login;
