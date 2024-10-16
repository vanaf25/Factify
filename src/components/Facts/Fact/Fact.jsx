import React, {useState} from "react";
import {addToFavorite, removeFromFavorite} from "../../../api/user";
import {FaShareAlt, FaStar} from "react-icons/fa";

const Fact = ({fact,setCurrentFact}) => {
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
    const [isFavorite,setIsFavorite]=useState(fact.isFavorite);
    const [isLoading,setIsLoading]=useState(false)
    const toggleFavoriteHandle=async (fact)=>{
        if (!fact.isFavorite){
            setIsLoading(true)
            await addToFavorite(fact._id)
            setIsFavorite(true)
            setIsLoading(false)
        }
        else{
            setIsLoading(true)
            await  removeFromFavorite(fact._id)
            setIsFavorite(false)
            setIsLoading(false)
        }
    }
    return (
        <div
            className="bg-cardBg p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
        >
            <div className={"cursor-pointer"}
                 onClick={setCurrentFact ? () => setCurrentFact(fact) : undefined}
            >
                <h3 className="text-lg font-bold text-primary mb-2">{fact.title}</h3>
                <span className={`font-bold uppercase text-sm ${String(getStatusColor(fact.truthStatus))}`}>
                {String(fact.truthStatus).replace('-', ' ')}
              </span>
            </div>
            <div className="flex justify-between mt-4">
                <button disabled={isLoading} onClick={() => toggleFavoriteHandle(fact)}
                        className={`${isFavorite ? "text-primary" : "text-upgrade"}  hover:text-primary transition-colors duration-300`}>
                    <FaStar/>
                </button>
                <button className="text-gray-500 hover:text-primary transition-colors duration-300">
                    <FaShareAlt/>
                </button>
            </div>
        </div>
    );
};

export default Fact;