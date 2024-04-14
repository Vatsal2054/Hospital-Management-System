import React, { useEffect, useState } from "react";

export default function Dashboard(props) {
    const [count, setCount] = useState({});
    const counts = {
        ICU: 0,
        ICCU: 0,
        Ward: 0,
        OPD: 0
    };

    useEffect(() => {
        // Iterate over patientData to count patients for each range
        props.data.forEach(patient => {
            if (patient.room_id >= 0 && patient.room_id <= 200) {
                counts.ICU++;
            } else if (patient.room_id >= 201 && patient.room_id <= 500) {
                counts.ICCU++;
            } else if (patient.room_id >= 501 && patient.room_id <= 800) {
                counts.Ward++;
            } else if (patient.room_id >= 801 && patient.room_id <= 999) {
                counts.OPD++;
            }
        });
        console.log(counts);
        // Update roomCounts state variable
        setCount(counts);
    }, [props.data]);

    return (
        <div className="dashboard">
            <div className="column">
                <div className="total">
                    <h2 className="blk">{props.empData1.name}</h2>
                    {props.empData1.job_type === "Doctor" &&
                    <>
                    <span className="emp blk"> <div className="head il-blk">Doctor ID</div>: {props.empData1.d_id}</span>
                    <span className="emp blk"> <div className="head il-blk">Qualification</div>: {props.empData1.dtype}</span>
                    </>
                    }
                    {props.empData1.job_type === "Nurse" &&
                    <>
                    <span className="emp blk"> <div className="head il-blk">Nurse ID</div>: {props.empData1.nurse_id}</span>
                    <span className="emp blk"> <div className="head il-blk">Employee ID</div>: {props.empData1.employee_id}</span>
                    </>
                    }
                    {props.empData1.job_type === "Receptionist" &&
                    <>
                    {/* <span className="emp blk"> <div className="head il-blk">Receptionist ID</div>: {props.empData1.nurse_id}</span> */}
                    <span className="emp blk"> <div className="head il-blk">Employee ID</div>: {props.empData1.employee_id}</span>
                    </>
                    }
                    <span className="emp blk"> <div className="head il-blk">Department</div>: {props.empData1.department}</span>
                </div>
                <div className="total il-blk mini-info">
                    <h2 className="blk">Total Patients</h2>
                    <span className="ans blk">{props.wardInfo.totalpatients}</span>
                </div>
                <div className="total il-blk mini-info">
                    <h2 className="blk">Ortho Patients</h2>
                    <span className="ans blk">{props.wardInfo.totalpatients}</span>
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
    )
}