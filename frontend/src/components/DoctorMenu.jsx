import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageHeader from "./PageHeader";
import HeaderButtons from "./DocComponents/HeaderButtons";
import axios from "axios";
import DataCont from "./DataCont";
import ViewEmp from "./ViewEmp";
import { FaBars, FaR } from "react-icons/fa6";
import { FaArrowLeft, FaClipboardCheck, FaRegUser } from "react-icons/fa6";
import "animate.css";
import { LuClipboardSignature, LuUsers, LuSettings } from "react-icons/lu";

// import '../sass/pages/_doctor.scss';

function DoctorMenu(){

    const [headerButtons, setHeaderButtons] = useState(false);
    const [data, setData] = useState([]);
    const [showPatients, setShowPatients] = useState(false);
    const [filterInput, setFilterInput] = useState("");
    const [viewP, setViewP] = useState(false);
    const [viewPData, setViewPData] = useState({});
    const [showMenu, setShowMenu] = useState(false);


    const location = useLocation();
    const { empData1 } = location.state || {};
    // console.log( "Received Data: ", empData1);

    useEffect(() => {
        async function fetchData(){
            console.log("Starting to fetch data!");
            await axios.get('http://localhost:3001/patients',{
                params: { department: empData1.department },
            })
            .then((response) => {
                console.log("Logging data!");
                console.log(response.data);
                // setShowPatients(true);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        fetchData();
    }, []);
        
        return (
        <div className="emp-menu">
            {viewP ? <ViewEmp Data = {viewPData} setView={setViewP} caller="Doctor" />: null}
            <PageHeader heading = {empData1.job_type}/>
            <div className="info">
                <div className="info-container">
                    <div className="info-container-header">
                        <div className="info-container-header-left">
                            <h1 className="info-container-header-head">Welcome</h1>
                        </div>
                        {
                            headerButtons ?
                            null:
                            <HeaderButtons setData={setData} setHeaderButtons={setHeaderButtons} setViewData={setShowPatients}/>
                        }
                    </div>
                    <div className="info-container-body">
                        <div className="side-menu">
                            <div className="head">
                                {showMenu ? 
                                <button className="side-menu-show blk" onClick={() => {setShowMenu(false)}}><FaArrowLeft className="mbtn-svg"/></button>
                                :
                                <button className="side-menu-show blk" onClick={() => {setShowMenu(true)}}><FaBars className="mbtn-svg"/></button>
                                }
                                {/* <h1 className="il-blk side-menu-head">Side-menu</h1> */}
                            </div>
                            <div className={showMenu ? "navigation-buttons wide-buttons": "navigation-buttons "}>
                                <button className="blk"><LuClipboardSignature className="button-icons"/>{showMenu ? "Assign Medicines" : null}</button>
                                <button className="blk" onClick={() => {setShowPatients(true)}}><LuUsers className="button-icons"/>{showMenu ? "Show Patients" : null}</button>
                                <button className="blk"><LuSettings className="button-icons"/>{showMenu ? "Settings" : null}</button>
                            </div>
                        </div>
                    {
                        showPatients &&
                        <DataCont 
                        type = {"patient"} 
                        setViewData = {setViewPData} 
                        setView={setViewP} 
                        Data={data} 
                        filterInput = {filterInput} 
                        setFilterInput={setFilterInput}
                        caller = "Doctor"
                    />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorMenu;