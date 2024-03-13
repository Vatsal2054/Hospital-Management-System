import axios from "axios";
import React, { useState } from "react";

export default function ViewEmpInfo(props) {
    const[emp, setEmp] = useState({});

    const empID = props.empData;
    async function getEmployee(id){
        await axios.get("http://localhost:3001/employee",{
            params: {employee_id: id},
        })
        .then((response) => {
            console.log(response.data);
            setEmp(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }
    getEmployee(empID);

    const docInfo = props.docInfo;
    return (
        <div className="data">
            {Object.entries(docInfo).map(([category, info]) => (
                <div key={category}>
                    <h3 className="data-head">{category}</h3>
                        {Object.entries(info).map(([key,value1]) => (
                            <div className="data-cell" key={key}>
                                <div className="data-cell-key"><h4>{key} : </h4></div>
                                <div className="data-cell-value">{value1}</div>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}