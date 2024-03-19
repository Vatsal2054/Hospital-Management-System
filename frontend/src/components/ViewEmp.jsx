import React from "react";
import { IoClose } from "react-icons/io5";
import ViewEmpInfo from "./ViewEmpInfo";
import axios from "axios";

export default function ViewEmp(props) {

    
    
    const empData = props.empData;
    const docInfo = {
        'General': {
            'Name': empData.name,
            'Gender': empData.Gender,
            'Contact': empData.contact,
            'Address': empData.Address,
        },
        'Job Info': {
            'Job Type': empData.JobType,
            'Employee ID': empData.employee_id,
            'Hiring Date': empData.hiredate,
            'Salary': empData.salary,
            'Doctor ID': empData.d_id,
            'Doctor Type': empData.dtype,
            'Department': empData.department,
            'Study Year': empData.study_year,
        },
        'Other': {
            'Username': empData.employee_id,
            'Password': empData.password,
        }
    }

    var docArrInfo = Object.entries(docInfo);
    console.log(docArrInfo);
    
    

    // var docArrInfo = Object.keys(docInfo).map((key) => [key. docInfo[key]]);
    // console.log(docArrInfo);
    
    
    // [['General', 'Name', 'Gender', 'Contact', 'Address'],
    // ['Job Info', 'Job Type', 'Employee ID', 'Hiredate', 'Salary', 'Doctor ID', 'Doctor Type', 'Department', 'Study year'], 
    // ['Credentials', 'Username', 'Password']];

    return (
        <div className="aeWindow">
            <div className="aeCont">
                <div className="aeCont-inner">
                    <div className="aeCont-inner-head">
                        <h1>Employee Information</h1>
                        <button onClick={() => { props.setViewEmp(false) }}><IoClose className="react-icons-close"/></button>
                    </div>
                    <div className="data-cont">
                        {empData.job_type === 'Doctor' && <ViewEmpInfo empData={empData} docInfo={docInfo} docArrInfo = {docArrInfo} />}
                    </div>
                </div>
            </div>
        </div>
    )
}