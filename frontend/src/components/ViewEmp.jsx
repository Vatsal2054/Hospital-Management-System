import React from "react";

export default function ViewEmp(props){

    const empData = props.empData;
    return (
        <div className="aeWindow">
            <div className="aeCont">
                {empData.map(field => {
                    return (
                        <div className="head">{field}</div>
                    );
                })}
            </div>
        </div>
    )
}