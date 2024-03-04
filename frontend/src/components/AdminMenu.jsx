import React, { useState } from "react";
import "../sass/main.scss";
import axios from "axios";
import { IconContext } from "react-icons";
import { FaUserPlus, FaUserEdit } from "react-icons/fa";
import EmpData from "./EmpData";
import AdminHeader from "./AdminHeader";

function AdminMenu(){
    // var showOptions = false;
    const [showOptions, setShowOptions] = useState(false);
    const [responseStatus, setResponseStatus] = useState(false);
    const [empData, setEmpData] = useState([]);

    async function fetchEmployeeData(){
        await axios.get("http://localhost:3001/emp_data")
        .then((response) => {
            console.log(empData);
            setEmpData(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <IconContext.Provider value={{ className:'react-icons' }}>
        <div className="admin-container">
        <AdminHeader />
        <div className="info">
            <div className="info-container">
                <div className="info-container-header">
                    <h1>Welcome!</h1>
                    {showOptions ? <nav className="info-container-header-nav menu">
                        <button className="menu-button"><FaUserPlus/> Add</button>
                        <button className="menu-button"><FaUserEdit/> Edit</button>
                    </nav> : <button onClick={() => {
                        fetchEmployeeData();
                        setShowOptions(true);
                    }} className="menu-button">Show Employees</button>}
                </div>
                <div className="info-container-data">
                    {empData.map((emp,index) => {
                        return (
                            <EmpData data={emp} index = {index}/>
                        )
                    })}
                </div>
            </div>
        </div>

        </div>
        
    </IconContext.Provider>
    )
}

export default AdminMenu;