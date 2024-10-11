import React from 'react';
import "./History.css"
import Facts from "../../components/Facts/Facts";
const History = () => {
    const facts = [
        { title: "Climate change is a hoax", status: "false" },
        { title: "Vaccines cause autism", status: "false" },
        { title: "5G technology spreads COVID-19", status: "false" },
        { title: "Misleading health supplements", status: "misleading" },
        { title: "Electric cars reduce emissions", status: "true" },
        { title: "Vaccine side effects", status: "partially-true" },
        { title: "Organic food is healthier", status: "partially-true" },
        { title: "Eating fat makes you fat", status: "false" },
        { title: "Drinking coffee stunts growth", status: "false" },
        { title: "Cell phones cause cancer", status: "misleading" },
        { title: "Homeopathy is effective", status: "misleading" },
        { title: "Carbs are bad for you", status: "partially-true" },
        { title: "Gluten is unhealthy for everyone", status: "false" },
        { title: "Detox diets are necessary", status: "misleading" },
        { title: "Mental health issues are not real", status: "false" },
    ];
    return (
            <div className="main-content">
                <div className="search-container">
                    <h2 className="user-greeting">Hi Shafi!</h2>
                    <div className="search-bar">
                        <input type="text" placeholder="Search for a fact..."/>
                        <button>Search</button>
                    </div>
                    <h3>Recent History</h3>
                    <Facts facts={facts}/>
                </div>
                <div className="details-view" id="detailsView">
                    <div className="details-content">
                        <button className="close-btn" onClick="closeDetails()">&times;</button>
                        <h3 id="factTitle"></h3>
                        <p id="factDetails"></p>
                    </div>
                </div>
            </div>
    );
};

export default History;