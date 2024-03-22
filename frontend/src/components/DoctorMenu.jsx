import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PageHeader from "./PageHeader";
import HeaderButtons from "./DocComponents/HeaderButtons";

function DoctorMenu(){

    const [headerButtons, setHeaderButtons] = useState(false);
    const [data, setData] = useState({});

    const location = useLocation();
    const { empData1 } = location.state || {};
    console.log( "Received Data: ", empData1);



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
                            <HeaderButtons setData={setData} setHeaderButtons={setHeaderButtons}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorMenu;