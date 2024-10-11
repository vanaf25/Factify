// src/components/GenerateCodesForm.jsx
import React from 'react';
import ReusableForm from "../../../components/Form/Form";

const GenerateCodesForm = () => {
    const formFields = [
        {
            label: 'Platform Name',
            name: 'platformName',
            type: 'text',
            placeholder: 'e.g., Youtuber A',
            validation: {
                required: 'Platform Name is required',
                maxLength: {
                    value: 50,
                    message: 'Platform Name cannot exceed 50 characters',
                },
            },
        },
        {
            label: 'How many codes do you want to generate?',
            name: 'numberOfCodes',
            type: 'number',
            placeholder: 'e.g., 100',
            validation: {
                required: 'Number of codes is required',
                min: { value: 1, message: 'At least 1 code must be generated' },
                max: { value: 1000, message: 'Cannot generate more than 1000 codes' },
            },
        },
    ];

    const handleFormSubmit = (data) => {
        // Handle form submission logic here
        console.log('Generated Codes Data:', data);
        // Example: API call to generate codes
        // fetch('/api/generate-codes', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data),
        // })
        // .then(response => response.json())
        // .then(result => {
        //   // Handle successful response
        // })
        // .catch(error => {
        //   // Handle errors
        // });
    };

    return (
        <ReusableForm
            title="Generate LTD Code"
            fields={formFields}
            onSubmit={handleFormSubmit}
            submitButtonText="Generate"
        />
    );
};

export default GenerateCodesForm;
