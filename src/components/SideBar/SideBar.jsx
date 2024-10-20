import React, { useState } from 'react';
import {Link, useLocation} from "react-router-dom";
import './SideBar.css';
import { useUser } from "../../context/UserContext";

const SideBar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar visibility on small devices
    const handleMouseEnter = () =>{
        console.log(window.innerWidth);
       if (window.innerWidth>600){
           setIsHovered(true);
       }
    }
    const handleMouseLeave = () =>{
        if (window.innerWidth>600){
            setIsHovered(false);
        }
    }
    const { user } = useUser();

    const toggleSidebar = () => setIsOpen(!isOpen);
    const {pathname}=useLocation();
    return (
        <>
            {!pathname.includes("signIn") && !pathname.includes("signUp") ?
            <>
                {!isOpen && <div className="hamburger-menu" onClick={toggleSidebar}>
                    <i className="fas fa-bars"></i>
                </div>}

                <aside
                    className={`sidebar ${isOpen ? 'open' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div>
                        {(isHovered || isOpen)  && (
                            <Link to={"/"}>
                                <div className="logo">
                                    <span className="logo-Factify">Factify</span><span className="logo-gpt">GPT</span>
                                </div>
                            </Link>
                        )}
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
                    {(isHovered || isOpen)  && (
                        <div className="sidebar-footer">
                            <div className="credits">
                                <span>Credits</span>
                                <span>{user.credits}</span>
                            </div>
                            <div style={{ marginBottom: "10px" }} className="plan">
                                <span>Plan: </span>
                                <span>{user.subscription}</span>
                            </div>
                            <Link to={"/upgrade"}>
                                <button className="upgrade-btn">Upgrade Plan</button>
                            </Link>
                        </div>
                    )}
                </aside>

                {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
            </>:""}
        </>
    );
};

export default SideBar;
