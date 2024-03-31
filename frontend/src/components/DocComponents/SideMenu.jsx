import React from "react";
import { FaBars, FaR, FaX } from "react-icons/fa6";
import { FaArrowLeft, FaXmark } from "react-icons/fa6";
import { LuClipboardSignature, LuUsers, LuSettings, LuLayout } from "react-icons/lu";


export default function SideMenu(props) {
    const showMenu = props.showMenu;

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
                        {/* <h1 className="il-blk side-menu-head">Side-menu</h1> */}
                    </div>
                    <div className={showMenu ? "navigation-buttons wide-buttons" : "navigation-buttons "}>
                        <button className="blk">
                            <LuLayout className="button-icons" />
                            {showMenu ? "Dashboard" : null}
                        </button>
                        <button className="blk">
                            <LuClipboardSignature className="button-icons" />
                            {showMenu ? "Assign Medicines" : null}
                        </button>
                        <button className="blk" onClick={() => { props.setShowPatients(true) }}>
                            <LuUsers className="button-icons" />
                            {showMenu ? "Show Patients" : null}
                        </button>
                        <button className="blk">
                            <LuSettings className="button-icons" />
                            {showMenu ? "Settings" : null}
                        </button>
                    </div>
                </div>

    )
}