import React, { useState } from "react";
import Heading from "./Heading";
import "../sass/main.scss";
import axios from "axios";
import { redirect } from "react-router-dom";

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
          if(response.data !== null){
            setLoginStatus(true);
            console.log("Redirecting...");
            return redirect("/nurse");
          } else {
            setLoginStatus(false);
            redirect("/Login");
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

  return (
    <div className="Login">
      <Heading content="Hospital Management System" class="Heading-head-name" />
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
                <option value="Nurse">Nurse</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Doctor">Doctor</option>
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

export default Login;
