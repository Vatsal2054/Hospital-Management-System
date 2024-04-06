import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function AssignMedicine(props) {
    const [pID, setPID] = useState("");
    const [medInfo, setMedInfo] = useState([{medicine_id: String, name: String}]);
    const [patientList, setPatientList] = useState([{ id: String, name: String }]);

    useEffect(() => {
        setPatientList([]);
        setMedInfo([]);
        async function fetchMedData(){
            await axios.get("http://localhost:3001/medInfo")
            .then(response => {
                // console.log(response.data);
                setMedInfo(response.data);
                console.log(medInfo);
            })
            .catch(err => {
                console.log(err);
            })
        }

        fetchMedData();
    }, []);

    function updatePatientList(patient) {
        var dupP = false;
        patientList.forEach(value => {
            if (value.id === patient.id) {
                dupP = true;
            }
        })
        if (dupP) {
            return;
        }
        else {
            setPatientList([...patientList, patient]);
        }
        console.log(patientList);
    }

    function removePatient(id) {
        console.log(id);

        setPatientList((preValues) => {
            const updatedList = preValues.filter((_, index) => index !== id);
            return updatedList;
        });
        console.log(patientList);
    }

    return (
        <div className="cont-info">
            {/* Component Header */}
            <div className="cont-info-head">
                <h1>Patient Medication</h1>
                <div className="right">
                    <button className="menu-button" onClick={() => { props.closeMenu("Medicine") }}><FaXmark className="cross" /></button>
                </div>
            </div>
            <div className="cont-body">
                <div className="cont-body-head">
                    <div className="inp-field">
                        <input type="text" className="table-input menu-button il-blk" placeholder="Patient ID" value={pID} onChange={(e) => { setPID(e.target.value) }} />
                        <button className="menu-button" onClick={() => { setPID("") }}><IoClose className="cross" /></button>
                        {pID !== '' &&
                            <div className="wrapper">
                                <div className="inp-field-list">
                                    {props.Data.filter(patient => patient.patient_id.includes(pID)).map((patient, index) => {
                                        return (
                                            <div className="inp-field-options" onClick={() => { updatePatientList({ 'id': patient.patient_id, 'name': patient.name }) }} key={index}>
                                                <div className="data-cell-value il-blk">{patient.patient_id}</div>
                                                <div className="data-cell-key il-blk">{patient.name}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        }
                        {/* <button className="menu-button">Find</button> */}
                    </div>
                    <div className={`patient-list ${patientList.length > 0 ? "" : "hide"}`}>
                        {patientList.length > 0 &&
                            patientList.map((patient, index) => {
                                return (
                                    <div className="patient-list-cells il-blk" key={index}>
                                        <div className="cell-info il-blk">
                                            <span className="id blk">{`${patient.id}`}</span>
                                            <span className="name blk">{`${patient.name}`}</span>
                                        </div>
                                        <button className="il-blk" onClick={() => { removePatient(index) }}><IoClose className="cell-close" /></button>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div className="cont-info-head">
                    <div className="head">
                        <h2>Assign Medicines</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}