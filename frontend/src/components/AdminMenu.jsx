import React, { useState } from "react";
import "../sass/main.scss";
import axios from "axios";
import { IconContext } from "react-icons";
import AdminHeader from "./AdminHeader";
import EmpDataCont from "./EmpDataCont";
import AdminMenuHeader from "./AdminMenuHeader";
import AdminEmpButtons from "./AdminEmpButtons";
import AddEditEmp from "./AddEditEmp";

function AdminMenu(){
    const [showOptions, setShowOptions] = useState(false);
    const [empData, setEmpData] = useState([]);
    const [adminHeader, setAdminHeader] = useState("Welcome!");
    const [addWindow, setAddWindow] = useState(false);

    async function fetchEmployeeData(props){
        setEmpData([]);
        console.log(props);
        
        await axios.get("http://localhost:3001/emp_data", {
            params: {employee: props},
        })
        .then((response) => {
            console.log(empData);
            setAdminHeader(props)
            setEmpData(response.data);
            setShowOptions(true);
            return;
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function resetMenu(){
        setEmpData([]);
        setShowOptions(false);
        setAdminHeader("Welcome!");
    }

    function addEmployee(employee){
        console.log("Add clicked!");
        
        setAddWindow(true);
    }

    return (
        <IconContext.Provider value={{ className:'react-icons' }}>
        {addWindow ? <AddEditEmp contHeader = {adminHeader} setAddWindow = {setAddWindow}/> : null}
        <div className="admin-container">
        <AdminHeader />
        <div className="info">
            <div className="info-container">
                <div className="info-container-header">
                    <h1>{adminHeader}</h1>
                    {showOptions ? <AdminMenuHeader resetMenu = {resetMenu} addEmployee = {addEmployee}/> : <AdminEmpButtons fetchEmployeeData = {fetchEmployeeData}/>
                    }
                </div>
                {empData.length === 0 ? null : <EmpDataCont empData = {empData}/>}
            </div>
        </div>
        </div>
        
    </IconContext.Provider>
    )
}

export default AdminMenu;