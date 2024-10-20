import React, {useEffect, useState} from 'react';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './Customizing.css';
import {getAllUsers} from "../../../api/user";
const ManageUsers = () => {
    const [rowData,setRows] = useState([]);

    const columnDefs = [
        { headerName: 'Username',flex:1, field: 'name' },
        { headerName: 'Email',flex:2, field: 'email' },
        { headerName: 'Credits',flex:1, field: 'credits' },
        { headerName: 'Subscription Type',flex:2, field: 'subscription' },
        { headerName: 'Platform Type',flex:1.4, field: 'platformType' },
        { headerName: 'LTD Coupon Codes',flex:2, field: 'ltdCouponCodes' },
        {
            headerName: 'Action',
            flex:1,
            field: 'action',
            cellRenderer: (params) => (
                <div>
                    <button className={"bg-secondary w-full hover:bg-red-700 text-white font-bold"}
                            onClick={() => handleDelete(params.data.username)}>Delete
                    </button>
                </div>
            ),
        },
    ];
    useEffect(() => {
        const func=async ()=>{
            const res=await getAllUsers()
            console.log(res);
            setRows(res);
        }
        func()
    }, []);
    const handleDelete = (username) => {
        // Handle delete action (e.g., remove from state, API call, etc.)
        console.log(`Delete user: ${username}`);
    };

    const exportToCSV = () => {
        // Convert rowData to CSV format
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

        // Add data rows
        for (const row of csvData) {
            const values = headers.map(header => JSON.stringify(row[header], (key, value) => value === null ? '' : value));
            csvRows.push(values.join(','));
        }

        // Create a Blob from the CSV rows and trigger a download
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
    return (
        <div className={"main-content"}>
            <div className={"flex justify-between"}>
                <h2>Manage Users</h2>
                <div>
                    <button onClick={exportToCSV} className={"bg-primary   py-4 px-8 hover:opacity-70 text-white"}>Download CSV</button>
                </div>
            </div>
            <div className="ag-theme-alpine" style={{width: '100%'}}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    domLayout='autoHeight'
                />
            </div>
        </div>
    );
};

export default ManageUsers;