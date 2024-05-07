import axios from "axios";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";

export default function AdmitPatient(props) {

    const [units, setUnits] = useState([]);
    const [pInfo, setPInfo] = useState({
        name: undefined,
        age: undefined,
        gender: undefined,
        ft: undefined,
        in: undefined,
        weight: undefined,
        blood_group: undefined,
        contact: undefined,
        address: undefined,
        relative_name: undefined,
        relative_contact: undefined,
        department: undefined,
        unit: undefined,
    })

    const dept_units = {
        Dermatology: ["DM1", "DM2", "DM3"],
        Ophthalmology: ["OP1", "OP2"],
        Orthopaedic: ["OU1", "OU2", "OU3"],
        Surgical: ["SU1", "SU2", "SU3"],
        Neurology: ["NU1", "NU2"],
        Cardiac: ["CU1", "CU2"],
        Medicine: ["MU1", "MU2", "MU3", "MU4"],
    };

    function handleDept(e) {
        const dept = e.target.value;
        console.log(dept);
        const units = dept_units[dept];
        console.log(units);

        setUnits(units);
    }

    function handleFormChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setPInfo((preValues) => {
            return {
                ...preValues,
                [name]: String(value),
            }
        })
    }

    async function submitPatient(e) {
        e.preventDefault();
        const entries = Object.entries(pInfo);
        for (let i = 0; i < entries.length; i++) {
            const [key, value] = entries[i];
            if (value === undefined || value === null || value === "") {
                let message = key + " cannot be empty.";
                toast.error(message, {
                    position: "top-center",
                });
                break; // Exit the loop
            }
        }

        await axios.post('http://localhost:3001/newPatient', {
            ...pInfo,
        })
        .then(response => {
            console.log(response.status);
            if(response.status === 200) {
                toast.success("Patient admitted successfully!", {
                    position: "top-center",
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="cont-info">
            <ToastContainer autoClose={3000} />
            <div className="cont-info-head">
                <h1>Admit New Patient</h1>
                <div className="right">
                    <button className="menu-button" onClick={() => { props.closeMenu("Admit") }}><FaXmark className="cross" /></button>
                </div>
            </div>
            <div className="cont-body">
                <div className="admit-form">
                    <form className="admit-form-cont">
                        <h2>Patient Details</h2>
                        <hr />
                        <div className="input-cell wide">
                            <label htmlFor="name">Patient Name</label>
                            <input type="text" id="name" name="name" value={pInfo.name} onChange={handleFormChange} maxLength={50} className="table-input white-back " />
                        </div>
                        <div className="input-cell small">
                            <label htmlFor="Age">Age</label>
                            <input type="number" id="Age" name="age" value={pInfo.age} onChange={handleFormChange} maxLength={3} min={0} className="table-input white-back " />
                        </div>
                        <div className="input-cell medium">
                            <label htmlFor="gender">Gender</label>
                            {/* <input type="text" id="name" maxLength={50} className="table-input white-back wide"/> */}
                            <select name="gender" id="gender" className="table-input white-back" value={pInfo.gender} onChange={handleFormChange}>
                                <option value="Select a gender" selected disabled>Select a Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="undisclosed">Prefer not to say</option>
                            </select>
                        </div>
                        <br />
                        <div className="input-cell medium">
                            <label htmlFor="Height">Height</label>
                            <input type="number" id="Height" name="ft" value={pInfo.ft} onChange={handleFormChange} maxLength={3} min={0} className="table-input white-back il-blk half" />
                            <span className="side-label">ft</span>
                            <input type="number" id="Height" name="in" value={pInfo.in} onChange={handleFormChange} maxLength={3} min={0} className="table-input white-back il-blk half" />
                            <span className="side-label">in</span>
                        </div>
                        <div className="input-cell small">
                            <label htmlFor="Weight">Weight</label>
                            <input type="number" id="Weight" name="weight" value={pInfo.weight} onChange={handleFormChange} maxLength={3} min={0} className="table-input white-back il-blk two-third" />
                            <span className="side-label-single">Kg</span>
                        </div>
                        <div className="input-cell medium">
                            <label htmlFor="Blood-group">Blood Group</label>
                            {/* <input type="text" id="name" maxLength={50} className="table-input white-back wide"/> */}
                            <select name="blood_group" id="Blood-group" value={pInfo.blood_group} onChange={handleFormChange} className="table-input white-back">
                                <option value="Select a Blood-group" selected disabled>Select a Blood group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        <div className="input-cell medium">
                            <label htmlFor="Contact">Contact (+91)</label>
                            <input type="number" id="Contact" name="contact" value={pInfo.contact} onChange={handleFormChange} maxLength={10} min={10} className="table-input white-back il-blk" />
                        </div>
                        <br />
                        <div className="input-cell wide">
                            <label htmlFor="Address">Address</label>
                            <textarea id="Address" name="address" value={pInfo.address} onChange={handleFormChange} maxLength={200} className="table-input white-back il-blk" />
                        </div>

                        <br />

                        <div className="input-cell wide">
                            <label htmlFor="Relative Name">Relative Name</label>
                            <input type="text" id="Relative Name" name="relative_name" value={pInfo.relative_name} onChange={handleFormChange} maxLength={50} className="table-input white-back " />
                        </div>
                        <div className="input-cell medium">
                            <label htmlFor="Relative Contact">Relative Contact (+91)</label>
                            <input type="number" id="Relative Contact" name="relative_contact" value={pInfo.relative_contact} onChange={handleFormChange} maxLength={10} min={10} className="table-input white-back il-blk" />
                        </div>
                        <br />
                        <h2>Department Details</h2>
                        <hr />
                        <div className="input-cell medium">
                            <label htmlFor="Department">Department</label>
                            <select name="department" id="Department" className="table-input white-back" value={pInfo.department} onChange={(e) => { handleDept(e); handleFormChange(e); }}>
                                <option value="Select a Blood-group" selected disabled>Select Department</option>
                                <option value="Cardiac">Cardiac</option>
                                <option value="Dermatology">Dermatology</option>
                                <option value="Medicine">Medicine</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Ophthalmology">Ophthalmology</option>
                                <option value="Orthopaedic">Orthopaedic</option>
                                <option value="Surgical">Surgical</option>
                            </select>
                        </div>
                        <div className="input-cell medium">
                            <label htmlFor="Unit">Unit</label>
                            <select name="unit" id="Unit" value={pInfo.unit} onChange={handleFormChange} className="table-input white-back">
                                <option value="Select-unit" selected disabled>Select Unit</option>
                                {(units || []).map(unit => {
                                    return (
                                        <option value={unit} key={unit}>{unit}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <br />

                        <div className="button-cell">
                            <button type="submit" className="menu-button" onClick={(e) => { submitPatient(e) }}>Admit Patient</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}