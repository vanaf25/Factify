import React, { useState } from "react";
import Form from "../../../components/Form/Form";
import { getLtdCode } from "../../../api/ltdCode";

const CheckLtdCode = () => {
    const fields = [
        {
            name: "code",
            label: "LTD Code",
            placeholder: "Enter LTD Code",
            type: "text",
            validation: { required: "LTD Code is required" },
        },
    ];

    const [isLoading, setIsLoading] = useState(false);
    const [res, setRes] = useState(null);
    const [error,setError]=useState("");
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const result = await getLtdCode(data.code);
            if(result.status==="error"){
                setError(result.message)
                setRes(null)
            }
            else {
                setError("")
                setRes(result);
            }
        } catch (error) {
            setRes(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Form
                globalError={error}
                onSubmit={onSubmit}
                isLoading={isLoading}
                resetForm
                submitButtonText={"Check Code"}
                fields={fields}
                title={"Check LTD Code"}
            />
            {res && (
                <div className="mt-4 p-4 w-[450px] mx-[auto] bg-white border rounded-lg shadow-lg">
                    {res.user ? (
                        <div>
                            <h2 className="text-lg font-semibold">User Information</h2>
                            <p className="text-gray-700">Name: {res.user.name}</p>
                            <p className="text-gray-700">Email: {res.user.email}</p>
                            <p className="text-gray-700">Available credits: {res.user.credits}</p>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-lg font-semibold">Code Status</h2>
                            <p className="text-gray-700">No one has used this LTD code.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CheckLtdCode;
