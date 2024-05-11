import React from "react";
import { FaBars } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { LuClipboardSignature, LuUsers, LuSettings, LuLayout } from "react-icons/lu";
import { MdOutlineBedroomChild } from "react-icons/md";
import { TiArrowShuffle } from "react-icons/ti";
import { FiUserPlus, FiUserMinus } from "react-icons/fi";
import { BiReceipt } from "react-icons/bi";
import { FaArrowRightFromBracket } from "react-icons/fa6";


export default function SideMenu(props) {
    const showMenu = props.showMenu;
    const menu = {
        'Dashboard': false,
        'Medicine': false,
        'showPatients': false,
        'Settings': false,
    }

    function handleCont(key) {
        props.setMenuCont({
            ...menu,
            [key]: true,
        })
    }

    return (
        <div className={`side-menu ${showMenu ? "show-menu" : ""}`}>
            <div className="head">
                {showMenu ?
                    <button className="side-menu-show il-blk" onClick={() => { props.setShowMenu(false) }}>
                        <FaArrowLeft className="mbtn-svg" />
                    </button>
                    :
                    <button className="side-menu-show il-blk" onClick={() => { props.setShowMenu(true) }}>
                        <FaBars className="mbtn-svg" />
                    </button>
                }
            </div>
            {props.menuPage === "Doctor" &&
                <div className={showMenu ? "navigation-buttons wide-buttons" : "navigation-buttons "}>
                    <button className={`blk ${props.menuCont.Dashboard && "active"}`} onClick={() => { handleCont("Dashboard") }}>
                        <LuLayout className="button-icons" />
                        <span className={showMenu ? "label" : "label-hide"}>Dashboard</span>
                    </button>
                    <button className={`blk ${props.menuCont.Medicine && "active"}`} onClick={() => { handleCont("Medicine") }}>
                        <LuClipboardSignature className="button-icons" />
                        <span className={showMenu ? "label" : "label-hide"}>Assign Medicines</span>
                    </button>
                    <button className={`blk ${props.menuCont.showPatients && "active"}`} onClick={() => { handleCont("showPatients") }}>
                        <LuUsers className="button-icons" />
                        <span className={showMenu ? "label" : "label-hide"}>Show Patients</span>
                    </button>
                    <button className={`blk ${props.menuCont.Settings && "active"}`} onClick={ () => {props.logout()}}>
                        <FaArrowRightFromBracket className="button-icons" />
                        <span className={showMenu ? "label" : "label-hide"}>Logout</span>
                    </button>
                </div>
            }
            {props.menuPage === "Nurse" &&
                <div className={showMenu ? "navigation-buttons wide-buttons" : "navigation-buttons "}>
                    <button className={`blk ${props.menuCont.Dashboard && "active"}`} onClick={() => { handleCont("Dashboard") }}>
                        <LuLayout className="button-icons" />
                        <span className={showMenu ? "label" : "label-hide"}>Dashboard</span>
                    </button>
                    <button className={`blk ${props.menuCont.Rooms && "active"}`} onClick={() => { handleCont("Rooms") }}>
                        <MdOutlineBedroomChild className="button-icons" />
                        <span className={showMenu ? "label" : "label-hide"}>Assign Rooms</span>
                    </button>
                    <button className={`blk ${props.menuCont.switchRooms && "active"}`} onClick={() => { handleCont("switchRooms") }}>
                        <TiArrowShuffle className="button-icons" />
                        <span className={showMenu ? "label" : "label-hide"}>Switch Rooms</span>
                    </button>
                    <button className={`blk ${props.menuCont.showPatients && "active"}`} onClick={() => { handleCont("showPatients") }}>
                        <LuUsers className="button-icons" />
                        <span className={showMenu ? "label" : "label-hide"}>Show Patients</span>
                    </button>
                    <button className={`blk ${props.menuCont.Settings && "active"}`} onClick={ () => {props.logout()}}>
                        <FaArrowRightFromBracket className="button-icons" />
                        <span className={showMenu ? "label" : "label-hide"}>Logout</span>
                    </button>
                </div>
            }
            {props.menuPage === "Receptionist" && 
                <div className={showMenu ? "navigation-buttons wide-buttons" : "navigation-buttons "}>
                {/* <button className={`blk ${props.menuCont.Dashboard && "active"}`} onClick={() => { handleCont("Dashboard") }}>
                    <LuLayout className="button-icons" />
                    <span className={showMenu ? "label" : "label-hide"}>Dashboard</span>
                </button> */}
                <button className={`blk ${props.menuCont.Admit && "active"}`} onClick={() => { handleCont("Admit") }}>
                    <FiUserPlus className="button-icons" />
                    <span className={showMenu ? "label" : "label-hide"}>Admit Patient</span>
                </button>
                <button className={`blk ${props.menuCont.Discharge && "active"}`} onClick={() => { handleCont("Discharge") }}>
                    <FiUserMinus className="button-icons" />
                    <span className={showMenu ? "label" : "label-hide"}>Discharge Patient</span>
                </button>
                <button className={`blk ${props.menuCont.Bill && "active"}`} onClick={() => { handleCont("Bill") }}>
                    <BiReceipt className="button-icons" />
                    <span className={showMenu ? "label" : "label-hide"}>Generate Bill</span>
                </button>
                <button className={`blk ${props.menuCont.showPatients && "active"}`} onClick={() => { handleCont("showPatients") }}>
                    <LuUsers className="button-icons" />
                    <span className={showMenu ? "label" : "label-hide"}>Show Patients</span>
                </button>
                <button className={`blk ${props.menuCont.Settings && "active"}`} onClick={ () => {props.logout()}}>
                    <FaArrowRightFromBracket className="button-icons" />
                    <span className={showMenu ? "label" : "label-hide"}>Logout</span>
                </button>
            </div>
            }
        </div>

    )
}