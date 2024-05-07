import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import SideMenu from "./DocComponents/SideMenu";
import AdmitPatient from "./RecComponents/AdmitPatient";

import "../sass/pages/_receptionist.scss";
import DischargePatient from "./RecComponents/DischargePatient";
import { FaXmark } from "react-icons/fa6";
import DataCont from "./DataCont";
import axios from "axios";
import ViewEmp from "./ViewEmp";
import { Navigate, useNavigate } from "react-router-dom";


function ReceptionistMenu() {
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const [filterInput, setFilterInput] = useState("");
    const [viewPData, setViewPData] = useState({});
    const [viewP, setViewP] = useState(false);
    const [menuCont, setMenuCont] = useState({
        'Dashboard': true,
        'Admit': false,
        'Discharge': false,
        'Bill': false,
        'showPatients': false
    });

    const [pData, setPData] = useState([{
        patient_id: undefined,
        name: undefined,
        age: undefined,
        gender: undefined,
        height: undefined,
        weight: undefined,
        blood_group: undefined,
        admit_date: undefined,
        discharge_date: undefined,
        contact: undefined,
        address: undefined,
        relative_name: undefined,
        relative_contact: undefined,
        is_discharged: undefined,
        room_id: undefined,
        department: undefined,
        unit: undefined,
    }]);

    async function fetchPatientData() {
        await axios.get("http://localhost:3001/allPatients")
            .then(response => {
                console.log(response.data);
                setPData(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchPatientData();
    }, [])

    function closeMenu(name) {
        setMenuCont((preValues) => {
            return {
                ...preValues,
                [name]: false,
                'Dashboard': true,
            }
        });
        setFilterInput("");
    }
    function logoutUser(){
        navigate('/');
    }

    //Data received from login page
    // const location = useLocation();
    // const { empData1 } = location.state || {};

    return (
        // <h1>Welcome to Receptionist Menu</h1>
        <div className="emp-menu">
            {viewP ? <ViewEmp Data={viewPData} setView={setViewP} caller="Nurse" header="Patient" /> : null}

            <div className="info-container-body">
            <SideMenu menuCont={menuCont} showMenu={showMenu} setShowMenu={setShowMenu} setMenuCont={setMenuCont} menuPage={"Receptionist"} logout={logoutUser} />

                <div className="cont">
                    <div className="header">
                        <h1 className="il-blk">Receptionist Menu</h1>
                        <button className="menu-button logout">Logout</button>
                    </div>

                    {/* Admit Patient Menu */}
                    {menuCont.Admit && <AdmitPatient closeMenu = {closeMenu} />}

                    {/* Discharge Patient Menu */}
                    {menuCont.Discharge && <DischargePatient closeMenu = {closeMenu} data={pData} />} 

                    {
                        menuCont.showPatients &&
                        <div className="cont-info">
                            {/* Component Header */}
                            <div className="cont-info-head">
                                <h1>Patient Information</h1>
                                <div className="right">
                                    <input type="text" className="table-input menu-button" value={filterInput} placeholder="Search" onChange={(e) => { setFilterInput(e.target.value) }} />
                                    <button className="menu-button" onClick={() => { closeMenu("showPatients") }}><FaXmark className="cross" /></button>
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
                    }
                </div>
            </div>
        </div>
    )
}

export default ReceptionistMenu;