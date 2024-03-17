import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ViewEmpInfo(props) {
    const[emp, setEmp] = useState({});

    const empID = props.empData;
    useEffect(() => {
        async function getEmployee(id) {
            try {
                const response = await axios.get("http://localhost:3001/employee", {
                    params: { employee_id: id },
                });
                console.log(response.data);
                setEmp(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getEmployee(props.empData);
    }, [props.empData]);

    const docInfo = props.docInfo;
    return (
        <div className="data">
            {Object.entries(docInfo).map(([category, info]) => (
                <div key={category}>
                    <h3 className="data-head">{category}</h3>
                        {Object.entries(Object(info)).map(([key,value1]) => (
                            <div className="data-cell" key={key}>
                                <div className="data-cell-key"><h4>{key} : </h4></div>
                                <div className="data-cell-value">{String(value1)}</div>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}