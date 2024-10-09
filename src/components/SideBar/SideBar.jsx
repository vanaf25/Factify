import React from 'react';

const SideBar = () => {
    return (
        <aside className="sidebar">
            <div>
                <div className="logo">
                    <span className="logo-Factify">Factify</span><span className="logo-gpt">GPT</span>
                </div>
                <div className="sidebar-item">
                    <i className="fas fa-home"></i>
                    <span>Home</span>
                </div>
                <div className="sidebar-item">
                    <i className="fas fa-star"></i>
                    <span>Favorites</span>
                </div>
                <div className="sidebar-item">
                    <i className="fas fa-cog"></i>
                    <span>Settings</span>
                </div>
            </div>
            <div className="sidebar-footer">
                <div className="credits">
                    <span>Credits</span>
                    <span>50</span>
                </div>
                <div className="plan">
                    <span>Plan</span>
                    <span>Basic</span>
                </div>
                <button className="upgrade-btn">Upgrade Plan</button>
            </div>
        </aside>
    );
};

export default SideBar;