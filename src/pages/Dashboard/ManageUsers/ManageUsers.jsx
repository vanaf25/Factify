import React, { useEffect, useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './Customizing.css';
import { getAllUsers,deleteUser } from "../../../api/user";
import LtdPopup from "./LtdPopup";

const ManageUsers = () => {
    const [rowData, setRows] = useState([]);
    const [popupData, setPopupData] = useState(null); // State to control popup data
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility
    const [deletingUser, setDeletingUser] = useState(null); // Track the user being deleted
    console.log('rowData:',rowData);
    const columnDefs = [
        { headerName: 'Username', flex: 1, field: 'name' },
        { headerName: 'Email', flex: 2, field: 'email' },
        { headerName: 'Credits', flex: 1, field: 'credits' },
        { headerName: 'Subscription Type', flex: 2, field: 'subscription' },
        {
            headerName: 'LTD Coupon Codes', flex: 2, field: 'ltdCouponCodes', cellRenderer: (params) => {
                return (
                    <div>
                        <button
                            disabled={params.data.ltdCodes.length === 0}
                            className={`w-full font-bold text-white 
                ${params.data.ltdCodes.length === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-primary hover:bg-primary-dark"}`}
                            onClick={() => handleOpenPopup(params.data)} // Open popup on click
                        >
                            Open
                        </button>
                    </div>
                );
            }
        },
        {
            headerName: 'Action', flex: 1, field: 'action', cellRenderer: (params) => (
                <div>
                    {params.data.role === "admin" ? <p>Admin</p>: <button
                        className={`bg-secondary w-full hover:bg-red-700 text-white font-bold 
                            ${params.data.role === "admin" || deletingUser === params.data._id ? "bg-gray-500 cursor-not-allowed" : ""}`}
                        disabled={params.data.role === "admin" || deletingUser === params.data._id} // Disable if currently deleting
                        onClick={() => handleDelete(params.data._id)}
                    >
                        {params.data.role === "admin" ? "Admin" : deletingUser === params.data._id ? "Deleting..." : "Delete"}
                    </button>}

                </div>
            ),
        },
    ];

    useEffect(() => {
        const func = async () => {
            const res = await getAllUsers();
            if (Array.isArray(res)) {
                setRows(res);
            }
        }
        func();
    }, []);

    const handleDelete = async (id) => {
        console.log('id:', id);
        setDeletingUser(id); // Set the username being deleted
        try {
            // Simulate API call or integrate your actual delete API logic here
            await deleteUser(id)
            setRows((prevRows) => prevRows.filter(row => row._id !== id)); // Remove the user from the table
        } catch (error) {
            alert("Error deleting user!")
            console.error(`Failed to delete user: ${id}`, error);
        } finally {
            setDeletingUser(null); // Reset deleting state
        }
    };

    const handleOpenPopup = (data) => {
        setPopupData(data);  // Set the selected row's data
        setIsPopupOpen(true); // Show the popup
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false); // Hide the popup
    };

    const exportToCSV = () => {
        const csvData = rowData.map(row => ({
            Username: row.name,
            Email: row.email,
            Credits: row.credits,
            'Subscription Type': row.subscription,
            'Platform Type': row.platformType,
            'LTD Coupon Codes': row.ltdCouponCodes,
        }));

        const csvRows = [];
        const headers = Object.keys(csvData[0]);
        csvRows.push(headers.join(',')); // Add header row

        for (const row of csvData) {
            const values = headers.map(header => JSON.stringify(row[header], (key, value) => value === null ? '' : value));
            csvRows.push(values.join(','));
        }

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'user_data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOverlayClick = () => {
        setIsPopupOpen(false);
    };

    // Prevent the popup form from closing when clicked inside
    const handlePopupClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className={"main-content"}>
            <div className={"flex justify-between"}>
                <h2>Manage Users</h2>
                <div>
                    <button onClick={exportToCSV} className={"bg-primary py-4 px-8 hover:opacity-70 text-white"}>Download CSV</button>
                </div>
            </div>

            <div className="ag-theme-alpine" style={{ width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    domLayout='autoHeight'
                />
            </div>
            {isPopupOpen && <LtdPopup handleOverlayClick={handleOverlayClick} popupData={popupData} handlePopupClick={handlePopupClick} />}
        </div>
    );
};

export default ManageUsers;
