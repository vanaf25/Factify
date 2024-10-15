import React from 'react';
import {FaShareAlt, FaStar} from "react-icons/fa";

const Facts = ({facts,setCurrentFact}) => {
    const getStatusColor = (status) => {
        switch(status) {
            case 'true':
                return 'text-accent1';
            case 'false':
                return 'text-secondary';
            case 'partially-true':
                return 'text-accent2';
            case 'misleading':
                return 'text-misleading';
            default:
                return 'text-gray-500';
        }
    };
    console.log('fact:',facts);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facts?.map((fact, index) => (
                <div
                    key={index}
                    className="bg-cardBg p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
                >
                    <div  className={"cursor-pointer"}
                          onClick={()=>setCurrentFact(fact)}
                    >
                        <h3 className="text-lg font-bold text-primary mb-2">{fact.title}</h3>
                        <span className={`font-bold uppercase text-sm ${String(getStatusColor(fact.truthStatus))}`}>
                {String(fact.truthStatus).replace('-', ' ')}
              </span>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button className="text-upgrade hover:text-primary transition-colors duration-300">
                            <FaStar/>
                        </button>
                        <button className="text-gray-500 hover:text-primary transition-colors duration-300">
                            <FaShareAlt/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Facts;