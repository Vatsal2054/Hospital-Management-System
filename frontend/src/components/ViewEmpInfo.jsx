import React from "react";

export default function ViewEmpInfo(props) {
    const Info = props.Info;
    return (
        <div className="data">
            {Object.entries(Info).map(([category, info]) => (
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