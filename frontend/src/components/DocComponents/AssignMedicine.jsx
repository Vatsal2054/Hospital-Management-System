import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { IoMdSave } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";


export default function AssignMedicine(props) {
    const [pID, setPID] = useState("");
    const [mID, setMID] = useState("");
    const [medInfo, setMedInfo] = useState([{ medicine_id: "", name: "", timing: [0, 0, 0] }]);
    const [medList, setMedList] = useState([{ medicine_id: "", name: "", timing: [0, 0, 0] }])
    const [patientList, setPatientList] = useState([{ id: String, name: String }]);

    useEffect(() => {
        setPatientList([]);
        setMedInfo([]);
        setMedList([]);
        setMID("");
        // async function fetchMedData() {
        axios.get("http://localhost:3001/medInfo")
            .then(response => {
                // console.log(response.data);
                let recData = response.data;

                recData.forEach(element => {
                    element.timing = [0, 0, 0];
                });

                setMedInfo(recData);
                console.log(recData);
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

    function updatePatientList(patient) {
        setMID("");
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

    function updateMedicineList(medicine) {
        var dupM = false;
        medList.forEach(meds => {
            if (meds.medicine_id === medicine.medicine_id) {
                dupM = true;
            }
        })
        if (dupM) {
            return;
        }
        else {
            setMedList([...medList, medicine]);
        }
        console.log(medList);
    }

    function removePatient(id) {
        console.log(id);

        setPatientList((preValues) => {
            const updatedList = preValues.filter((_, index) => index !== id);
            return updatedList;
        });
        console.log(patientList);
    }
    
    function removeMedicine(id) {
        console.log(id);

        setMedList((preValues) => {
            const updatedList = preValues.filter((_, index) => index !== id);
            return updatedList;
        });
        console.log(medList);
    }

    function saveMedTiming(index, timing){
        console.log(timing);
        // let selectedMed = medList.filter((med) => med.medicine_id === id)
        // selectedMed[0].timing = timing;
        // console.log(selectedMed);
        setMedList((preValues) => {
            preValues[index].timing = timing;
            console.log("Changing Timings");
            console.log("New List: ", preValues);
            
            return [...preValues];
        })
    }

    async function saveMedInfo() {
        const PIDs = patientList.map(patient => patient.id);
        const MIDs = medList;
        console.log(PIDs, MIDs);
        await axios.post('http://localhost:3001/saveMedInfo', {
            patients: PIDs,
            medicines: MIDs,
        })
            .then(response => {
                console.log(response.data);
                if (response.data.status === 200) {
                    toast.success("Medicines updated!", {
                        position: "top-center",
                    })
                }
                setPatientList([]);
                setMedList([]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="cont-info">
            <ToastContainer autoClose={3000} />
            {/* Component Header */}
            <div className="cont-info-head">
                <h1>Patient Medication</h1>
                <div className="right">
                    <button className="menu-button" onClick={() => { props.closeMenu("Medicine") }}><FaXmark className="cross" /></button>
                </div>
            </div>
            <div className="cont-body">
                <div className="patient-part part">
                    <div className="inp-field">
                        <input type="text" className="table-input menu-button il-blk" placeholder="Search Patient" value={pID} onClick={() => { setMID("") }} onChange={(e) => { setPID(e.target.value) }} />
                        <button className="menu-button" onClick={() => { setPID("") }}><IoClose className="cross" /></button>
                        {pID !== '' &&
                            <div className="wrapper">
                                <div className="inp-field-list">
                                    {props.Data.filter(patient => patient.patient_id.includes(pID) || patient.name.toLowerCase().includes(pID.toLowerCase())).map((patient, index) => {
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
                    <div className='patient-list'>
                        <div className={`wrapper `}>
                            <h2 className={`${patientList.length > 0 ? "message" : "hide"}`}>Selected Patients</h2>
                            {patientList.length > 0 ?
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
                                })
                                :
                                <div className="message">
                                    <h2>No patients Selected</h2>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="med-part part">
                    {/* <h2>Assign Medicines</h2> */}
                    <div className="inp-field">
                        <input type="text" className="table-input menu-button il-blk" placeholder="Search Medicine" value={mID} onClick={() => { setPID("") }} onChange={(e) => { setMID(e.target.value) }} />
                        <button className="menu-button" onClick={() => { setMID("") }}><IoClose className="cross" /></button>
                        {mID !== '' &&
                            <div className="wrapper">
                                <div className="inp-field-list">
                                    {medInfo.filter(meds => meds.medicine_id.includes(mID) || meds.name.toLowerCase().includes(mID.toLowerCase())).map((meds, index) => {
                                        return (
                                            <div className="inp-field-options" onClick={() => { updateMedicineList({ 'medicine_id': meds.medicine_id, 'name': meds.name, 'timing': meds.timing }) }} key={index}>
                                                <div className="data-cell-value il-blk">{meds.medicine_id}</div>
                                                <div className="data-cell-key il-blk">{meds.name}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                    <div className="medicine-list">
                        <div className={`wrapper `}>
                            <h2 className={`${medList.length > 0 ? "message" : "hide"}`}>Selected Medicines</h2>
                            {medList.length > 0 ?
                                medList.map((medicine, index) => {
                                    return (
                                        <div className=" med-block il-blk" key={index}>
                                            <button className="il-blk" onClick={() => { removeMedicine(index) }}><IoClose className="cell-close" /></button>
                                            <div className="med-block-inner">
                                                <div className="cell-info">
                                                    <span className="id blk">{`${medicine.medicine_id}`}</span>
                                                    <span className="name blk">{`${medicine.name}`}</span>
                                                </div>
                                                <div className="timing">
                                                    <h3 className="il-blk">Timing: </h3>
                                                    <div className="timing-cells il-blk">
                                                        <div className={medicine.timing[0] === 1 ? "selected" : ""} onClick={() => {saveMedTiming(index, [medicine.timing[0] === 0 ? 1 : 0, medicine.timing[1], medicine.timing[2]])}}>Morning</div>
                                                        <div className={medicine.timing[1] === 1 ? "selected" : ""} onClick={() => {saveMedTiming(index, [medicine.timing[0], medicine.timing[1] === 0 ? 1 : 0, medicine.timing[2]])}}>Noon</div>
                                                        <div className={medicine.timing[2] === 1 ? "selected" : ""} onClick={() => {saveMedTiming(index, [medicine.timing[0], medicine.timing[1],  medicine.timing[2] === 0 ? 1 : 0])}}>Night</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className="message">
                                    <h2>No Medicines Selected</h2>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="cont-bottom">
                <div className="buttons">
                    <button className="menu-button" onClick={saveMedInfo}><IoMdSave className="react-icons" />Save Medications</button>
                </div>
            </div>
        </div>
    );
}