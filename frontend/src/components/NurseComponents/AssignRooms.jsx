import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function AssignRooms (props){
    const [pID, setPID] = useState("");

    return(
        <div className="cont-info">
            <div className="cont-info-head">
                <h1>Assign Rooms</h1>
                <div className="right">
                    <button className="menu-button" onClick={() => { props.closeMenu("Rooms") }}><FaXmark className="cross" /></button>
                </div>
            </div>
            <div className="cont-body">
                <div className="patient-part part">
                    {/* <h1>Patient</h1> */}
                    <div className="inp-field">
                    <input type="text" className="table-input menu-button il-blk" placeholder="Search Patient" value={pID} onChange={(e) => { setPID(e.target.value) }} />
                        <button className="menu-button" onClick={() => { setPID("") }}><IoClose className="cross" /></button>
                    </div>
                </div>
                <div className="room-part part">
                    <h1>Room</h1>
                </div>
            </div>
        </div>
    )
}