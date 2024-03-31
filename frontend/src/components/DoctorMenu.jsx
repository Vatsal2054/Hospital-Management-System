import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DataCont from "./DataCont";
import ViewEmp from "./ViewEmp";
import SideMenu from "./DocComponents/SideMenu";
import { FaXmark } from "react-icons/fa6";
import "animate.css";
import "../sass/pages/_doctor.scss";

// import '../sass/pages/_doctor.scss';

export default function DoctorMenu() {

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
        }
        fetchData();
    }, []);

    function closePatientMenu() {
        setShowPatients(false);
        setFilterInput("");
    }

    return (
        <div className="emp-menu">
            {viewP ? <ViewEmp Data={viewPData} setView={setViewP} caller="Doctor" header="Patient" /> : null}
            <div className="info-container-body">

                {/* Side Menu Code Here ..... Left side of page */}
                <SideMenu showMenu={showMenu} setShowMenu={setShowMenu} setShowPatients={setShowPatients} />
                
                {/* Right Side of page */}
                <div className="cont">
                    {/* Top Header of page */}
                    <div className="header">
                        <h1 className="il-blk">Doctor Menu</h1>
                    </div>

                    {/* Displaying Patient Information using State */}
                    {
                        showPatients &&
                        <div className="cont-info">
                            {/* Component Header */}
                            <div className="cont-info-head">
                                <h1>Patient Information</h1>
                                <div className="right">
                                    <input type="text" className="table-input menu-button" value={filterInput} placeholder="Search" onChange={(e) => { setFilterInput(e.target.value) }} />
                                    <button className="menu-button" onClick={closePatientMenu}><FaXmark className="cross" /></button>
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