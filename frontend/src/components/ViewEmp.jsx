import React from "react";
import { IoClose } from "react-icons/io5";
import ViewEmpInfo from "./ViewEmpInfo";
import axios from "axios";

export default function ViewEmp(props) {

    const Data = props.Data;
    console.log("Data received: " + Data);
    

    const docInfo = {
        'General': {
            'Name': Data.name,
            'Gender': Data.Gender,
            'Contact': Data.contact,
            'Address': Data.Address,
        },
        'Job Info': {
            'Job Type': Data.job_type,
            'Employee ID': Data.employee_id,
            'Hiring Date': Data.hiredate,
            'Salary': Data.salary,
            'Doctor ID': Data.d_id,
            'Doctor Type': Data.dtype,
            'Department': Data.department,
            'Study Year': Data.study_year,
        },
        'Other': {
            'Username': Data.employee_id,
            'Password': Data.password,
        }
    }
    const nurseInfo = {
        'General': {
            'Name': Data.name,
            'Gender': Data.Gender,
            'Contact': Data.contact,
            'Address': Data.Address,
        },
        'Job Info': {
            'Job Type': Data.job_type,
            'Employee ID': Data.employee_id,
            'Hiring Date': Data.hiredate,
            'Salary': Data.salary,
            'Nurse ID': Data.nurse_id,
            'Department': Data.department,
        },
        'Other': {
            'Username': Data.employee_id,
            'Password': Data.password,
        }
    }
    const recInfo = {
        'General': {
            'Name': Data.name,
            'Gender': Data.Gender,
            'Contact': Data.contact,
            'Address': Data.Address,
        },
        'Job Info': {
            'Job Type': Data.job_type,
            'Employee ID': Data.employee_id,
            'Hiring Date': Data.hiredate,
            'Salary': Data.salary,
        },
        'Other': {
            'Username': Data.employee_id,
            'Password': Data.password,
        }
    }
    const pInfo = {
        'General': {
            'Name': Data.name,
            'Gender': Data.gender,
            'Contact': Data.contact,
        },
        'Body Info': {
            'Patient ID': Data.patient_id,
            'Age': Data.age + ' years',
            'Height': Data.height,
            'Weight': Data.weight + ' Kg',
            'Blood Group': Data.blood_group,
        },
        'Other': {
            'Room ID': Data.room_id,
            'Department': Data.department,
            'Unit': Data.unit,
        }
    }


    var ArrInfo;
    ArrInfo = Data.job_type === "Doctor" && Object.entries(docInfo);
    ArrInfo = Data.job_type === "Nurse" && Object.entries(nurseInfo);
    ArrInfo = Data.job_type === "Receptionist" && Object.entries(recInfo);
    ArrInfo = props.caller === "Doctor" && Object.entries(pInfo);
    console.log(ArrInfo);

    return (
        <div className="aeWindow">
            <div className="aeCont">
                <div className="aeCont-inner">
                    <div className="aeCont-inner-head">
                        <h1>{props.header} Information</h1>
                        <button onClick={() => { props.setView(false) }}><IoClose className="react-icons-close"/></button>
                    </div>
                    <div className="data-cont">
                        {Data.job_type === 'Doctor' && <ViewEmpInfo Data={Data} Info={docInfo} ArrInfo = {ArrInfo} />}
                        {Data.job_type === 'Nurse' && <ViewEmpInfo Data={Data} Info={nurseInfo} ArrInfo = {ArrInfo} />}
                        {Data.job_type === 'Receptionist' && <ViewEmpInfo Data={Data} Info={recInfo} ArrInfo = {ArrInfo} />}
                        {props.caller === 'Doctor' && <ViewEmpInfo Data={Data} Info={pInfo} ArrInfo = {ArrInfo} />}
                    </div>
                </div>
            </div>
        </div>
    )
}