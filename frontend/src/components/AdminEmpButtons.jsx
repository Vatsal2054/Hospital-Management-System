import React from "react";
import { FaUserDoctor, FaUserNurse, FaHospitalUser } from "react-icons/fa6";


function AdminEmpButtons(props) {
    return (
        <div className="employee-buttons"><button onClick={() => {
            props.fetchEmployeeData("Doctor");
        }} className="menu-button"><FaUserDoctor/>Doctors</button>
        <button onClick={() => {
            props.fetchEmployeeData("Nurse");
        }} className="menu-button"><FaUserNurse/>Nurses</button>
        <button onClick={() => {
            props.fetchEmployeeData("Receptionist");
        }} className="menu-button"><FaHospitalUser/>Receptionists</button>
        </div>
    )
}

export default AdminEmpButtons;