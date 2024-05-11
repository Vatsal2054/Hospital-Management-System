import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DataCont from "./DataCont";
import ViewEmp from "./ViewEmp";
import SideMenu from "./DocComponents/SideMenu";
import { FaXmark } from "react-icons/fa6";
import "animate.css";
import "../sass/pages/_doctor.scss";
import AssignMedicine from "./DocComponents/AssignMedicine";
import Dashboard from "./DocComponents/Dashboard";
import { Navigate, useNavigate } from "react-router-dom";
import { FaUserMd } from "react-icons/fa";


// import '../sass/pages/_doctor.scss';

export default function DoctorMenu() {
    const navigate = useNavigate();
    const [data, setData] = useState([{ room_id: 0 }]);
    
    // const [showPatients, setShowPatients] = useState(false);
    const [filterInput, setFilterInput] = useState("");
    const [viewP, setViewP] = useState(false);
    const [viewPData, setViewPData] = useState({});
    const [showMenu, setShowMenu] = useState(false);
    const [wardInfo, setWardInfo] = useState({ totalpatients: '' });
    // const [showDashboard, setShowDashboard] = useState(false);
    const [menuCont, setMenuCont] = useState({
        'Dashboard': true,
        'Medicine': false,
        'showPatients': false,
        'Settings': false
    });

    // Data received from Login Page...
    const location = useLocation();
    const { empData1 } = location.state || {};

    
    // console.log( "Received Data: ", empData1);

    useEffect(() => {
        async function fetchData() {
            console.log("Starting to fetch data!");
            await axios.get('http://localhost:3001/patients', {
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

            await axios.get('http://localhost:3001/wardInfo')
                .then((response) => {
                    console.log(response.data);
                    setWardInfo(response.data);
                    console.log(wardInfo);

                    // setShowDashboard(true);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     // Iterate over patientData to count patients for each range
    //     data.forEach(patient => {
    //         if (patient.room_id >= 0 && patient.room_id <= 200) {
    //             counts.ICU++;
    //         } else if (patient.room_id >= 201 && patient.room_id <= 500) {
    //             counts.ICCU++;
    //         } else if (patient.room_id >= 501 && patient.room_id <= 800) {
    //             counts.Ward++;
    //         } else if (patient.room_id >= 801 && patient.room_id <= 999) {
    //             counts.OPD++;
    //         }
    //     });
    //     console.log(counts);
    //     // Update roomCounts state variable
    //     setCount(counts);
    // }, [data]);

    // calculateRoomCounts();

    function closeMenu(name) {
        setMenuCont((preValues) => {
            return {
                ...preValues,
                [name]: false,
                'Dashboard' : true,
            }
        });
        setFilterInput("");
    }

    function logoutUser(){
        navigate('/');
    }

    return (
        <div className="emp-menu">
            {viewP ? <ViewEmp Data={viewPData} setView={setViewP} caller="Doctor" header="Patient" /> : null}
            <div className="info-container-body">

                {/* Side Menu Code Here ..... Left side of page */}
                <SideMenu menuCont={menuCont} showMenu={showMenu} setShowMenu={setShowMenu} setMenuCont={setMenuCont} menuPage={"Doctor"} logout={logoutUser} />

                {/* Right Side of page */}
                <div className="cont">
                    {/* Top Header of page */}
                    <div className="header">
                        <h1 className="il-blk">Doctor Menu</h1>
                        {/* <button className="menu-button logout">Logout</button> */}
                        <div className="account-block">
                            <FaUserMd className="react-icons header-icons" />
                            <h2 className="il-blk">{empData1.name}</h2>
                        </div>
                    </div>
                    {/* {menuCont.Dashboard &&
                        <div className="dashboard">
                            <div className="column">
                                <div className="total">
                                    <h2 className="blk">{empData1.name}</h2>
                                    <span className="emp blk"> <div className="head il-blk">Doctor ID</div>: {empData1.d_id}</span>
                                    <span className="emp blk"> <div className="head il-blk">Qualification</div>: {empData1.dtype}</span>
                                    <span className="emp blk"> <div className="head il-blk">Department</div>: {empData1.department}</span>
                                </div>
                                <div className="total il-blk mini-info">
                                    <h2 className="blk">Total Patients</h2>
                                    <span className="ans blk">{wardInfo.totalpatients}</span>
                                </div>
                                <div className="total il-blk mini-info">
                                    <h2 className="blk">Ortho Patients</h2>
                                    <span className="ans blk">{wardInfo.totalpatients}</span>
                                </div>
                            </div>

                            <div className="column">
                                <div className="total">
                                    {Object.entries(count).map(([name, value]) => (
                                        <div className="blocks il-blk" key={name}>
                                            <h2 className="blk">{name}</h2>
                                            <span className="ans blk">{String(value)} <span className="pat-holder">patients</span></span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    } */}
                    {menuCont.Dashboard && <Dashboard data={data} empData1 = {empData1} wardInfo = {wardInfo} />}

                    {/* Assign Medicine Menu */}
                    {
                        menuCont.Medicine &&
                        <AssignMedicine closeMenu = {closeMenu} Data = {data}/>
                    }

                    {/* Displaying Patient Information using State */}
                    {
                        menuCont.showPatients &&
                        <div className="cont-info">
                            {/* Component Header */}
                            <div className="cont-info-head">
                                <h1>Patient Information</h1>
                                <div className="right">
                                    <input type="text" className="table-input menu-button" value={filterInput} placeholder="Search" onChange={(e) => { setFilterInput(e.target.value) }} />
                                    <button className="menu-button" onClick={() => {closeMenu("showPatients")}}><FaXmark className="cross" /></button>
                                </div>
                            </div>

                            {/* Component which builds and displays Table */}
                            <DataCont
                                type={"patient"}
                                setViewData={setViewPData}
                                setView={setViewP}
                                Data={data}
                                filterInput={filterInput}
                                setFilterInput={setFilterInput}
                                caller="Doctor"
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}