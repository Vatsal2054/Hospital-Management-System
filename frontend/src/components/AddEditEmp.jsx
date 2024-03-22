import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { IoMdSave } from "react-icons/io";
import axios from "axios";
import { docDetails, recDetails, nurseDetails, docInputFields, recInputFields, nurseInputFields } from "./AdminAEData";

export default function AddEditEmp(props) {

    var detailContent;
    props.contHeader === "Doctor" && (detailContent = docDetails);
    props.contHeader === "Nurse" && (detailContent = nurseDetails);
    props.contHeader === "Receptionist" && (detailContent = recDetails);

    var infoContent;
    props.contHeader === "Doctor" && (infoContent = docInputFields);
    props.contHeader === "Nurse" && (infoContent = nurseInputFields);
    props.contHeader === "Receptionist" && (infoContent = recInputFields);

    const [details, setDetails] = useState({job_type: String(props.contHeader)});

    function resetState() {
        setDetails({job_type: String(props.contHeader)});
    }

    function handleAEChange(event) {
        const { name, value } = event.target;
        console.log([name] + ": " + value);

        setDetails((prevValues) => {
            return {
                ...prevValues,
                [name]: value,
            }
        })
        console.log(details);
    }

    async function newEmp(e) {
        e.preventDefault();
        await axios.post("http://localhost:3001/newDoc", details)
            .then(response => {
                let responseData = response;
                console.log(responseData);
                if (responseData.status === 200) {
                    console.log("Employee Registered");
                    props.showToast(200);
                }
                else if (responseData.status === 201) {
                    props.showToast(201);
                }
                else if(responseData.status === 400) {
                    props.showToast(400);
                }
            })

            .catch((err) => {
                props.showToast(400);
                console.log(err);
            });
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
                        <form className="aeCont-inputs">
                            {
                                infoContent.map((field) => {
                                    return (
                                        <div className="aeCont-inputs-block">
                                            <input type={field[1]} name={field[0]} onChange={handleAEChange} value={details[field[0]] ?? ''} required />
                                            <label className="input-placeholder">{field[2]}</label>
                                        </div>
                                    );
                                })
                            }
                            <div className="aeCont-inputs-buttons">
                                <button type="submit" className="aeCont-inputs-button" onClick={newEmp}><IoMdSave className="form-icon" />Save</button>
                                <button className="aeCont-inputs-button" onClick={resetState}><FaArrowRotateLeft className="react-icons form-icon-small" />Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
