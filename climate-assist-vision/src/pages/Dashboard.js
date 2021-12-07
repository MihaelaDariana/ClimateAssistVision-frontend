import React from "react";
import '../styles/Dashboard.css';

function Dashboard() {
    return(
        <div>
                <div className = "search-box">
                 <input
                 type = "text"
                 className = "search-bar"
                 placeholder = "Search...">
                 </input>
                </div>
        </div>
    )
}

export default Dashboard;