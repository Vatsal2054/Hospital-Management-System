import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SideMenu from "./DocComponents/SideMenu";
import Dashboard from "./DocComponents/Dashboard";
import DataCont from "./DataCont";
import { FaXmark } from "react-icons/fa6";
import AssignRooms from "./NurseComponents/AssignRooms";
import ViewEmp from "./ViewEmp";
import SwitchRooms from "./NurseComponents/SwitchRooms";
// import { IoClose } from "react-icons/io5";

function NurseMenu(props) {
    const [showMenu, setShowMenu] = useState(false);
    const [data, setData] = useState([{ room_id: 0 }]);
    const [wardInfo, setWardInfo] = useState({ totalpatients: '' });
    const [filterInput, setFilterInput] = useState("");
    const [viewPData, setViewPData] = useState({});
    const [viewP, setViewP] = useState(false);

    const [menuCont, setMenuCont] = useState({
        'Dashboard': true,
        'Rooms': false,
        'switchRooms': false,
        'showPatients': false,
        'Settings': false
    });

    //Data received from login page
    const location = useLocation();
    const { empData1 } = location.state || {};

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

    return (
        <div className="emp-menu">
            {viewP ? <ViewEmp Data={viewPData} setView={setViewP} caller="Nurse" header="Patient" /> : null}

            <div className="info-container-body">
                <SideMenu menuCont={menuCont} showMenu={showMenu} setShowMenu={setShowMenu} setMenuCont={setMenuCont} menuPage={"Nurse"} />

                <div className="cont">
                    <div className="header">
                        <h1 className="il-blk">Nurse Menu</h1>
                        <button className="menu-button logout">Logout</button>
                    </div>

                    {/* Dashboard Component */}
                    {menuCont.Dashboard && <Dashboard data={data} empData1={empData1} wardInfo={wardInfo} />}

                    {/* Room Assign Menu Component */}
                    {menuCont.Rooms && <AssignRooms Data={data} closeMenu={closeMenu} empData1={empData1} />}

                    {/* Switch Room Menu Component */}
                    {menuCont.switchRooms && <SwitchRooms Data={data} closeMenu={closeMenu} empData1={empData1} />}

                    {/* Patient Table Component */}
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
                                Data={data}
                                filterInput={filterInput}
                                setFilterInput={setFilterInput}
                                caller="Nurse"
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default NurseMenu;
