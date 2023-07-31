import React from "react";
import { Link } from "react-router-dom";

export default function Nav () {
    return (
        <div className="card-header">
            <ul className="nav nav-pills card-header-pills p-2">
                {window.location.pathname !== "/" ? <li className="nav-item"><Link className="mr-4 p-4 link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to="/">Home</Link></li> : ""}           
                {window.location.pathname !== "/calculations" ? <li className="nav-item"><Link className="mr-4 p-4 link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to="/calculations">Calculations</Link></li> : ""}
                {window.location.pathname !== "/addfood" ? <li className="nav-item"><Link className="mr-4 p-4 link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to="/addfood">Add Food</Link></li> : ""}
                {window.location.pathname !== "/dailymeals" ? <li className="nav-item"><Link className="mr-4 p-4 link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to="/dailymeals">Daily Meals</Link></li> : ""}
            </ul>
        </div>
    )
}