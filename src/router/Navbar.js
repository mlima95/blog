import React from "react";
import {Link} from "react-router-dom";
import './Navbar.css';

export default function Navbar(props){
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>  
                    <Link to="/admin">Admin</Link>
                </li>
            </ul>
        </nav>
    )
}

// style={{position:"absolute",right:"15px",borderLeft:"5px solid #f1f1f1"}}