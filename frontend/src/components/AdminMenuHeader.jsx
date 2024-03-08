import React from "react";
import { FaUserPlus, FaUserEdit } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";


function AdminMenuHeader(props) {
    return (
        <nav className="info-container-header-nav menu">
            <button onClick={props.addEmployee} className="menu-button"><FaUserPlus /> Add</button>
            <button onClick={props.editEmployee} className="menu-button"><FaUserEdit /> Edit</button>
            <button onClick={props.resetMenu} className="menu-button-back"><FaArrowLeft /></button>
        </nav>
    )
}

export default AdminMenuHeader;