import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { patientInfo } from "../Extra";
import { IoMdSave } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";

export default function AssignRooms(props) {
    // const [pID, setPID] = useState("");
    const [patient, setPatient] = useState({ id: "", name: "" });
    const [roomType, setRoomType] = useState("");
    // let patientWithoutRooms;
    const [patientWithoutRooms, setPatientWithoutRooms] = useState([patientInfo]);
    const [availableRooms, setAvailableRooms] = useState([{ room_number: null, room_id: null }]);
    const [selectedRoom, setSelectedRoom] = useState({ room_number: null, room_id: null })

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

    useEffect(() => {
        // setPatient({id: "", name:""});
        // patientWithoutRooms = props.Data.filter((patient) => patient.room_id === null);
        // console.log("Patient with no rooms assigned:",patientWithoutRooms);
        fetchData();
    }, []);

    function updatePatientList(patient) {
        setPatient({
            id: patient.patient_id,
            name: patient.name,
        });
        console.log(patient);
    }

    async function updateRoomType(e) {
        console.log(e.target.value);
        await setRoomType(e.target.value);
        axios.get('http://localhost:3001/avlRooms', {
            params: { roomType: e.target.value },
        })
            .then(response => {
                console.log(response.data);
                setAvailableRooms(response.data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    async function saveRoomInfo() {
        console.log(patient, selectedRoom);

        if(patient.id === "") {
            toast.error("Please select a patient!");
            return;
        }

        if(roomType === "") {
            toast.error("Please select a room type!");
            return;
        }

        if(selectedRoom.room_number === null) {
            toast.error("Please select a room!");
            return;
        }

        await axios.post('http://localhost:3001/assignRoom', {
                patient_id: patient.id,
                room_number: selectedRoom.room_number,
                room_id: selectedRoom.room_id,
        })
        .then(response => {
            console.log(response);

            if(response.status === 200){
                toast.success(`${roomType} category room with room number: ${selectedRoom.room_number}, assigned to ${patient.name}`);
                setPatient({ id: "", name: "" });
                setRoomType("");
                fetchData();
                setAvailableRooms([{ room_number: null, room_id: null }]);
                setSelectedRoom({ room_number: null, room_id: null });
            }
        })
    }

    return (
        <div className="cont-info">
            <ToastContainer autoClose={3000} />
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
                                <div className="list-item il-blk">
                                    <span className="il-blk"><div className="heading il-blk">ID</div>: <div className="value il-blk"> {patient.id} </div></span>
                                    <span className="il-blk"><div className="heading il-blk">Name</div>: <div className="value il-blk"> {patient.name} </div></span>
                                </div>
                                <button className="il-blk" onClick={() => { setPatient({ id: "", name: "" }) }}><IoClose className="cell-close" /></button>
                            </div>
                            :
                            <div className="patient-list-inner message">
                                <div className="patient-list-body wrapper">
                                    {patientWithoutRooms.map((patient, index) => {
                                        return (
                                            <div className="list-item" onClick={() => { updatePatientList(patient) }} key={index}>
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
                        <select name="Room type" className="table-input menu-button il-blk" onChange={updateRoomType}>
                            <option selected disabled value="">None Selected</option>
                            <option value="ICU">ICU</option>
                            <option value="ICCU">ICCU</option>
                            <option value="General">General</option>
                            <option value="Premium">Premium</option>
                            <option value="Reserved">Reserved</option>
                        </select>
                    </div>
                    <div className="room-list">
                        {availableRooms[0].room_id !== null ?
                            <div className="patient-list-body wrapper">
                                <div className="message">
                                    <h2>Available rooms</h2>
                                </div>
                                {availableRooms.map((room, index) => {
                                    return (
                                        <button className={`${selectedRoom.room_number === room.room_number ? "patient-list-cells room-cells il-blk selected" : "patient-list-cells room-cells il-blk"}`} key={index} onClick={() => { setSelectedRoom(room) }}>
                                            <div className="cell-info il-blk">
                                                <span className="id blk">{room.room_number}</span>
                                                {/* <span className="name blk">{`${patient.name}`}</span> */}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                            :
                            <div className="message">
                                <h2>Select Room Type</h2>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="cont-bottom">
                <div className="buttons">
                    <button className="menu-button" onClick={saveRoomInfo}><IoMdSave className="react-icons" />Save Changes</button>
                </div>
            </div>
        </div>
    )
}