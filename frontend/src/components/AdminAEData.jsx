import React from "react";

export const docDetails = {
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
};

export const recDetails = {
    employee_id: "",
    name: "",
    contact: null,
    job_type: "",
    hiredate: "",
    password: "",
    salary: null,
    Gender: "",
    Address: "",  
}

export const nurseDetails = {
    nurse_id: "",
    employee_id: "",
    name: "",
    department: "",
    contact: null,
    job_type: "",
    hiredate: "",
    password: "",
    salary: null,
    Gender: "",
    Address: "",  
}

export const docInputFields = [
    ["d_id", "text", "Doctor ID"],
    ["employee_id", "text", "Employee ID"],
    ["name", "text", "Full name"],
    ["dtype", "text", "Doctor type"],
    ["department", "text", "Department"],
    ["study_year", "number", "Year of degree"],
    ["contact", "tel", "Contact"],
    ["hiredate", "date", "Hire date"],
    ["password", "text", "Password"],
    ["salary", "number", "Salary"],
    ["Gender", "text", "Gender"],
    ["Address", "text", "Address"]  
];

export const recInputFields = [
    ["employee_id", "text", "Employee ID"],
    ["name", "text", "Full name"],
    ["contact", "tel", "Contact"],
    ["hiredate", "date", "Hire date"],
    ["password", "text", "Password"],
    ["salary", "number", "Salary"],
    ["Gender", "text", "Gender"],
    ["Address", "text", "Address"]  
];

export const nurseInputFields = [
    ["nurse_id", "text", "Nurse ID"],
    ["employee_id", "text", "Employee ID"],
    ["name", "text", "Full name"],
    ["department", "text", "Department"],
    ["contact", "tel", "Contact"],
    ["hiredate", "date", "Hire date"],
    ["password", "text", "Password"],
    ["salary", "number", "Salary"],
    ["Gender", "text", "Gender"],
    ["Address", "text", "Address"]  
];