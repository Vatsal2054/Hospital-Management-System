import React from "react";

function EmpData(props) {
    const emp = props.data;

  return (
    <button>
    <tr className="dataChild" key={props.index}>
        <td>{props.index + 1}</td>
        <td>{emp.employee_id}</td>
        <td>{emp.name}</td>
        <td>{emp.name}</td>
        <td>{emp.name}</td>
    </tr>
    </button>
  );
}

export default EmpData;
