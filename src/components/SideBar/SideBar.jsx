import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import './SideBar.css'
const SideBar = () => {
    const [isHovered,setIsHovered]=useState(false)
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const path=useLocation()
    console.log('p:',path);
    return (
        <aside
            
            onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} className="sidebar">
            <div>
                {isHovered  && <Link to={"/"}>
                    <div className="logo">
                        <span className="logo-Factify">Factify</span><span className="logo-gpt">GPT</span>
                    </div>
                </Link>
                }
                <Link to={"/"}>
                    <div className="sidebar-item">
                        <i className="fas fa-home"></i>
                        <span>Home</span>
                    </div>
                </Link>
                <Link to={"/favorites"}>
                    <div className="sidebar-item">
                        <i className="fas fa-star"></i>
                        <span>Favorites</span>
                    </div>
                </Link>
                <Link to={"/settings"}>
                    <div className="sidebar-item">
                        <i className="fas fa-cog"></i>
                        <span>Settings</span>
                    </div>
                </Link>
            </div>
            {isHovered && <div className="sidebar-footer">
                <div className="credits">
                    <span>Credits</span>
                    <span>50</span>
                </div>
                <div style={{marginBottom:"10px"}} className="plan">
                    <span>Plan: </span>
                    <span>Basic</span>
                </div>
                <Link to={"/upgrade"}>
                    <button className="upgrade-btn">Upgrade Plan</button>
                </Link>
            </div>}
        </aside>
    );
};

export default SideBar;