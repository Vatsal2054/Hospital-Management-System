import React, { useState } from "react";
import Heading from "./Heading";
import "../sass/main.scss";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {

  const [destination, setDestination] = useState("");
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [credentials, setCredentials] = useState({
    employee_id: "",
    password: "",
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

  async function passToServer() {
    console.log("pressed");
    
    if (
      credentials.employee_id !== "" &&
      credentials.password !== ""
    ) {
      console.log("Sending data to server...");
      await axios.post("http://localhost:3001/login", credentials)

        .then((response) => {
            let responseData = response.data;
            console.log(responseData);
            
            if( responseData.auth_status === 200){

              console.log("Redirecting...");
              setDestination(responseData.destination);
              toast.success("Authentication Successful!", {
                position: "top-center"
              });
              setLoginStatus(true);

            }
            else {
              console.log("Incorrect Credentials");
              setLoginStatus(false);
              toast.error("Incorrect Credentials!", {
                position: "top-center"
              });   
              // toast.success("Authentication Successful!", {
              //   position: "top-center"
              // });      
          }
        })

        .catch((err) => {
          console.log(err);
        });
    }
  }

  function preventSubmit(e) {
    e.preventDefault();
  }

  if (isLoggedIn) {

    var userDestination = "/" + destination + "Menu";
    console.log(userDestination);
    return <Navigate to={userDestination} />;

  } else {
    return (
      <div className="Login">
        <ToastContainer autoClose={3000}/>
        <div className="Heading-head-name">
        <Heading
          content="Hospital Management System"
        />
        </div>
        <div className="Login-container-outer">
          <div className="Login-container-inner">
            <Heading content="Login to HMS" class="Login-Heading" />
            <form className="Login-form" onSubmit={preventSubmit}>
              <input
                className="Login-form-input item-margin"
                type="text"
                name="employee_id"
                placeholder="Employee ID"
                onChange={handleInput}
                value={credentials.employee_id}
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
              <button
                onClick={passToServer}
                className="Login-form-button item-margin"
                type="button"
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