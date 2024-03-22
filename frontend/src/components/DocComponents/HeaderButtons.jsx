import React, {useState} from "react";
import { FaArrowLeft } from "react-icons/fa6";


export default function HeaderButtons(props) {
    return (
        <div className="button-container">
            <button className="menu-button" onClick={props.handle1}>Patients</button>
            <button className="menu-button" onClick={props.handle2}>Medicines</button>
            <button className="menu-button-back" onClick={props.handle3}><FaArrowLeft className="react-icons"/></button>
        </div>
    )
}