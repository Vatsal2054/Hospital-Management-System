import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { patientInfo } from "../Extra";

export default function AssignRooms(props) {
    const [pID, setPID] = useState("");
    const [patient, setPatient] = useState({ id: "", name: "" });
    const [roomType, setRoomType] = useState("");
    // let patientWithoutRooms;
    const [patientWithoutRooms, setPatientWithoutRooms] = useState([patientInfo]);

    useEffect(() => {
        // setPatient({id: "", name:""});
        // patientWithoutRooms = props.Data.filter((patient) => patient.room_id === null);
        // console.log("Patient with no rooms assigned:",patientWithoutRooms);
        async function fetchData() {
            await axios.get('http://localhost:3001/patUR', {
                params: { department: props.empData1.department },
            })
                .then((response) => {
                    console.log(response.data);
                    setPatientWithoutRooms(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        fetchData();
    }, []);

    function updatePatientList(patient) {
        setPatient({
            id: patient.patient_id,
            name: patient.name,
        });
        console.log(patient);
    }

    function updateRoomType(e) {
        // console.log(e.target.value);
        setRoomType(e.target.value);
        console.log(roomType);
    }

    return (
        <div className="cont-info">
            <div className="cont-info-head">
                <h1>Assign Rooms</h1>
                <div className="right">
                    <button className="menu-button" onClick={() => { props.closeMenu("Rooms") }}><FaXmark className="cross" /></button>
                </div>
            </div>
            <div className="cont-body">
                <div className="patient-part part">
                    <div className="inp-field">
                        <h1>Select Patient</h1>
                    </div>
                    <div className='patient-list'>
                        {patient.id !== "" ?
                            <div className="patient-list-cells il-blk">
                                <div className="cell-info il-blk">
                                    <span className="id blk">{patient.id}</span>
                                    <span className="name blk">{patient.name}</span>
                                </div>
                                <button className="il-blk" onClick={() => { setPatient({ id: "", name: "" }) }}><IoClose className="cell-close" /></button>
                            </div>
                            :
                            <div className="patient-list-inner message">
                                <div className="patient-list-body wrapper">
                                    {patientWithoutRooms.map((patient, index) => {
                                        return (
                                            <div className="list-item" onClick={() => {updatePatientList(patient)}} key={index}>
                                                <span className="il-blk"><div className="heading il-blk">ID</div>: <div className="value il-blk"> {patient.patient_id} </div></span>
                                                <span className="il-blk"><div className="heading il-blk">Name</div>: <div className="value il-blk"> {patient.name} </div></span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="room-part part">
                    {/* <h1>Room</h1> */}
                    <div className="inp-field">
                        {/* <input type="dropdown" /> */}
                        <select name="Room type" className="table-input menu-button il-blk">
                            <option onClick={() => { updateRoomType(this) }} selected disabled value="">Select room type</option>
                            <option onClick={() => { updateRoomType(this) }} value="ICU">ICU</option>
                            <option onClick={() => { updateRoomType(this) }} value="ICCU">ICCU</option>
                            <option onClick={() => { updateRoomType(this) }} value="General">General</option>
                            <option onClick={() => { updateRoomType(this) }} value="Premium">Premium</option>
                            <option onClick={() => { updateRoomType(this) }} value="Reserved">Reserved</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}