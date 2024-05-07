import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import DataCont from "../DataCont";
import DischargeConfirmation from "./DischargeConfirmation";


export default function DischargePatient(props) {
    const [filterInput, setFilterInput] = useState("");
    const [viewPData, setViewPData] = useState({});
    const [viewP, setViewP] = useState(false);
    const pData = props.data;

    async function DischargePat(patient_id){
        await axios.post("http://localhost:3001/dischargePatient", {
            patient_id: patient_id,
        })
        .then(response => {
            console.log(response.status);
            setViewP(false);
        })
    }

    return (
        // <h1>Discharge Menu</h1>
        <div className="cont-info">
            <ToastContainer autoClose={3000} />
            {viewP && <DischargeConfirmation Data = {viewPData} setView = {setViewP} DischargePatient = {DischargePat} />}
            <div className="cont-info-head">
                <h1>Discharge Patient</h1>
                <div className="right">
                    <input type="text" className="table-input menu-button" value={filterInput} placeholder="Search" onChange={(e) => { setFilterInput(e.target.value) }} />
                    <button className="menu-button" onClick={() => { props.closeMenu("showPatients") }}><FaXmark className="cross" /></button>
                </div>
            </div>
            {/* Component which builds and displays Table */}
            <DataCont
                type={"patient"}
                setViewData={setViewPData}
                setView={setViewP}
                Data={pData}
                filterInput={filterInput}
                setFilterInput={setFilterInput}
                caller="Nurse"
            />
        </div>
    )
}