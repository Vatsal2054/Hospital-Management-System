import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageHeader from "./PageHeader";
import HeaderButtons from "./DocComponents/HeaderButtons";
import axios from "axios";
import DataCont from "./DataCont";

function DoctorMenu(){

    const [headerButtons, setHeaderButtons] = useState(false);
    const [data, setData] = useState({});
    const [showPatients, setShowPatients] = useState(false);

    const location = useLocation();
    const { empData1 } = location.state || {};
    // console.log( "Received Data: ", empData1);

    async function fetchData(){
        console.log("Starting to fetch data!");
        await axios.get('http://localhost:3001/patients',{
            params: { department: empData1.department },
        })
        .then((response) => {
            console.log("Logging data!");
            console.log(response.data);
            setShowPatients(true);
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="emp-menu">
            <PageHeader heading = {empData1.job_type}/>

            <div className="info">
                <div className="info-container">
                    <div className="info-container-header">
                        <h1>Welcome</h1>
                        {
                            headerButtons ?
                            <h6>Showing Header buttons</h6>:
                            <HeaderButtons fetchData={fetchData} setData={setData} setHeaderButtons={setHeaderButtons}/>
                        }
                    </div>
                    {showPatients ? <DataCont data = {data} type = "patient"/> : null}
                </div>
            </div>
        </div>
    )
}

export default DoctorMenu;