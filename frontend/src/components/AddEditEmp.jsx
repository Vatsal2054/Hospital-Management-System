import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import PhoneInput from "react-phone-number-input";
import { docInputFields } from "./InputInfo";
import { FaCheck } from "react-icons/fa6";
import { IoMdSave } from "react-icons/io";

export default function AddEditEmp(props) {

    const [docDetails, setDocDetails] = useState({
        d_id: "",
        employee_id: "",
        name: "",
        dtype: "",
        department: "",
        study_year: null,
        contact: null,
        job_type: "",
        hiredate: "",
        password: "",
        salary: null,
        Gender: "",
        Address: "",
    });

    function handleAEChange(event){
        const {name, value} = event.target;
        console.log([name] + ": " + value);
        
        setDocDetails((prevValues) => {
            return {
                ...prevValues,
                [name]: value,
            }
        })
        console.log(docDetails);
    }

    return (
        <div className="aeWindow">
            <div className="aeCont">
                <div className="aeCont-inner">
                    <div className="aeCont-inner-head">
                        <h1>Add new {props.contHeader}</h1>
                        <button onClick={() => { props.setAddWindow(false) }} className="aeCont-close"><IoClose className="react-icons-close" /></button>
                    </div>
                    <div className="aeCont-outer">
                    <div className="aeCont-inputs">
                        {
                            docInputFields.map((field) => {
                                return (
                                    <div className="aeCont-inputs-block">
                                    <input type={field[1]} name={field[0]} onChange={handleAEChange} value={docDetails[field[0]] ?? ''}/>
                                    <label className="input-placeholder">{field[2]}</label>
                                    </div>
                                );
                            })
                        }
                        <div className="aeCont-inputs-buttons">
                        <button className="aeCont-inputs-button"><IoMdSave className="form-icon"/>Save</button>
                        <button className="aeCont-inputs-button"><IoMdSave className="form-icon"/>Reset</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
