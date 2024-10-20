// src/components/GenerateCodesForm.jsx
import React, {useState} from 'react';
import ReusableForm from "../../../components/Form/Form";
import {generateCouponCode} from "../../../api/couponCode";
import {AgGridReact} from "ag-grid-react";
const CouponList = ({ coupons }) => {
    // Function to copy the code to clipboard
    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
    };

    return (
        <div className="container mx-auto py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {coupons.map((coupon) => (
                    <div
                        key={coupon.code}
                        className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    >
                        <div className="text-xl font-bold text-primary mb-2">
                            Code: {coupon.code}
                        </div>
                        <div className="text-gray-700 text-base">
                            Credit Value: {coupon.creditValue}
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => handleCopy(coupon.code)}
                                className="bg-primary text-white py-2 px-4 rounded hover:bg-teal-600 transition-colors duration-300"
                            >
                                Copy Code
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};const GenerateCodesForm = () => {
    const formFields = [
        {
            label: 'How many credits will each code have?',
            name: 'creditValue',
            type: 'number',
            placeholder: 'e.g., 10',
            validation: {
                required: 'Credits per code is required',
                min: { value: 1, message: 'At least 1 credit per code' },
                max: { value: 100, message: 'Cannot exceed 100 credits per code' },
            },
        },
        {
            label: 'How many codes do you want to generate?',
            name: 'couponAmount',
            type: 'number',
            placeholder: 'e.g., 100',
            validation: {
                required: 'Number of codes is required',
                min: { value: 1, message: 'At least 1 code must be generated' },
                max: { value: 1000, message: 'Cannot generate more than 1000 codes' },
            },
        },
    ];
        const [rowData,setRowData]=useState([])
    const handleFormSubmit = async (data) => {
        console.log('d:',data);
        const res=await generateCouponCode({creditValue:Number(data.creditValue),couponAmount:+data.couponAmount})
        console.log('Generated Codes Data:', res);
        setRowData(res)

    };

    return (
        <>
            <ReusableForm
                title="Generate Coupon Code"
                fields={formFields}
                onSubmit={handleFormSubmit}
                submitButtonText="Generate"
            />
            {rowData.length ? <CouponList coupons={rowData}/>:""}
        </>

    );
};

export default GenerateCodesForm;
