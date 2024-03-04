import React from "react";

function AdminHeader(){
    return (
        <div className="admin-header">
            <h1>Admin Menu</h1>
            <nav className="navigation">
                <button>Account</button>
                <button>Other</button>
                <button>Sign out</button>
            </nav>
        </div>
    )
}

export default AdminHeader;