import React from "react";
import { IoClose } from "react-icons/io5";
import { FiUserMinus } from "react-icons/fi";


export default function DischargeConfirmation(props) {
    // const Info = props.Info;
    const Data = props.Data;

    const Info = {
        'General': {
            'Name': Data.name,
            'Gender': Data.gender,
            'Contact': Data.contact,
        },
        'Diagnostics': {
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

    return (
        <div className="aeWindow">
            <div className="aeCont">
                <div className="aeCont-inner">
                    <div className="aeCont-inner-head">
                        <h1>Patient Discharge Confirmation</h1>
                        <button onClick={() => { props.setView(false) }}><IoClose className="react-icons-close" /></button>
                    </div>
                    <div className="data-cont">
                        <div className="data">
                            {Object.entries(Info).map(([category, info]) => (
                                <div key={category}>
                                    <h3 className="data-head">{category}</h3>
                                    {Object.entries(Object(info)).map(([key, value1]) => (
                                        <div className="data-cell" key={key}>
                                            <div className="data-cell-key"><h4>{key} : </h4></div>
                                            <div className="data-cell-value">{String(value1)}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="table-buttons">
                            <button className="menu-button red-button" onClick={() => {props.DischargePatient(Data.patient_id)}}><FiUserMinus className="react-icons"/>Discharge Patient</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}