import React, { useState } from "react";
import Heading from "./Heading";
import "../sass/main.scss";
import axios from "axios";
import { Navigate } from "react-router-dom";

const options = ["Nurse", "Receptionist", "Doctor", "Admin"];

function Login() {
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    designation: "",
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setCredentials((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  function handleDropdown(e) {
    const post = e.target.value;
    setCredentials((preValue) => {
      return {
        ...preValue,
        designation: post,
      };
    });
  }

  async function passToServer() {
    if (
      credentials.username !== "" &&
      credentials.password !== "" &&
      credentials.designation !== ""
    ) {
      console.log("Sending data to server...");
      await axios
        .post("http://localhost:3001/login", credentials)
        .then((response) => {
          console.log(response);
          if (response.data !== null) {

            console.log("Redirecting...");
            setLoginStatus(true);

          } else {

            setLoginStatus(false);
            setCredentials({
              username: "",
              password: "",
              designation: "",
            });

          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // return <Redirect to="/Nurse-menu" />;
  }

  function preventSubmit(e) {
    e.preventDefault();
  }

  if (isLoggedIn) {

    var destination = "/" + credentials.designation + "Menu";
    return <Navigate to={destination} />;

  } else {
    
    return (
      <div className="Login">
        <Heading
          content="Hospital Management System"
          class="Heading-head-name"
        />
        <div className="Login-container-outer">
          <div className="Login-container-inner">
            <Heading content="Login to HMS" class="Login-Heading" />
            <form className="Login-form" onSubmit={preventSubmit}>
              <input
                className="Login-form-input item-margin"
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleInput}
                value={credentials.username}
                required
              />
              <br />
              <input
                className="Login-form-input item-margin"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInput}
                value={credentials.password}
                required
              />
              <div className="Login-form-dropdown item-margin">
                <select onChange={handleDropdown} id="dropdown" required>
                  <option value="" disabled selected>
                    Select Designation
                  </option>
                  {options.map((Value) => {
                    return <option value={Value}>{Value}</option>;
                  })}
                </select>
              </div>
              <button
                onClick={passToServer}
                className="Login-form-button item-margin"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;