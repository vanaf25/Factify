import React from 'react';
import "./History.css"
import Facts from "../../components/Facts/Facts";
const History = ({setCurrentFact,histories}) => {
    return (
            <>
                    <h3>Recent History</h3>
                {histories.length ? <Facts setCurrentFact={setCurrentFact} facts={histories}/>:"No history yet"}
                <div className="details-view" id="detailsView">
                    <div className="details-content">
                        <button className="close-btn" onClick="closeDetails()">&times;</button>
                        <h3 id="factTitle"></h3>
                        <p id="factDetails"></p>
                    </div>
                </div>
            </>
    );
};

export default History;