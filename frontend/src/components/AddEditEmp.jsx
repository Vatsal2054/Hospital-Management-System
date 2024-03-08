import React from "react";
import { IoClose } from "react-icons/io5";


export default function AddEditEmp(props) {
    return (
        <div className="aeWindow">
            <div className="aeCont">
                <div className="aeCont-inner">
                    <div className="aeCont-inner-head">
                        <h1>Add new {props.contHeader}</h1>
                        <button onClick={() => {props.setAddWindow(false)}} className="aeCont-close"><IoClose className="react-icons-close" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
