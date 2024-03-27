import React, { useState } from "react";
import "../sass/main.scss";
import axios from "axios";
import { IconContext } from "react-icons";
import AdminHeader from "./PageHeader";
import EmpDataCont from "./DataCont";
import AdminMenuHeader from "./AdminMenuHeader";
import AdminEmpButtons from "./AdminEmpButtons";
import AddEditEmp from "./AddEditEmp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewEmp from "./ViewEmp";
// import {columns} from "./TableContents";
import { useLocation } from "react-router-dom";


function AdminMenu() {
    const [showOptions, setShowOptions] = useState(false);
    const [empData, setEmpData] = useState([]);
    const [adminHeader, setAdminHeader] = useState("Welcome!");
    const [addWindow, setAddWindow] = useState(false);
    const [filterInput, setFilterInput] = useState("");
    // const [viewWindow, setViewWindow] = useState(false);
    const [viewEmp , setViewEmp] = useState(false);
    const [viewEmpData, setViewEmpData] = useState({});

    const location = useLocation();
    const { empData1 } = location.state || {};
    console.log( "Received Data: ", empData1);

    //fetch data of specific employee type
    async function fetchEmployeeData(props) {
        setEmpData([]);
        console.log(props);

        await axios.get("http://localhost:3001/emp_data", {
            params: { employee: props },
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

    //reset data and collapse table
    function resetMenu() {
        setEmpData([]);
        setShowOptions(false);
        setAdminHeader("Welcome!");
    }

    //displays add window
    function addEmployee() {
        console.log("Add clicked!");
        setAddWindow(true);
    }

    //Handling pop-up messages
    function showToast(type){
        if(type === 200){
            setAddWindow(false);
            toast.success( adminHeader + " Registered!", {
                position: "top-center"
            });
        }
        if(type === 201){
            toast.error( adminHeader + " already exists!", {
                position: "top-center",
            });
        }
        if(type === 400){
            toast.error("Error occured!", {
                position: "top-center",
            });
        }
    }

    return (
        <IconContext.Provider value={{ className: 'react-icons' }}>
            {addWindow ? <AddEditEmp contHeader={adminHeader} setAddWindow={setAddWindow} showToast={showToast}/> : null}
			{viewEmp ? <ViewEmp Data={viewEmpData} setView={setViewEmp}/> : null}
            <div className="admin-container">
            <ToastContainer autoClose={3000}/>
                <AdminHeader heading = {empData1.job_type}/>
                <div className="info">
                    <div className="info-container">
                        <div className="info-container-header">
                            <h1>{adminHeader}</h1>
                            {
                                showOptions ?
                                    <AdminMenuHeader
                                        filterInput={filterInput}
                                        setFilterInput={setFilterInput}
                                        resetMenu={resetMenu}
                                        addEmployee={addEmployee}
                                    />
                                    :
                                    <AdminEmpButtons
                                        fetchEmployeeData={fetchEmployeeData}
                                    />
                            }
                        </div>
                        {empData.length === 0 ? null : <EmpDataCont 
                            type={"employee"} 
                            setViewData={setViewEmpData} 
                            setView={setViewEmp} 
                            Data={empData} 
                            filterInput={filterInput} 
                            setFilterInput={setFilterInput} 
                            caller="Admin" 
                        />}
                    </div>
                </div>
            </div>

        </IconContext.Provider>
    )
}

export default AdminMenu;