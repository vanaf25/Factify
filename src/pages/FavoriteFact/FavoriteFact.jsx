import React, {useEffect, useState} from 'react';
import Facts from "../../components/Facts/Facts";
import {getFavoriteFacts} from "../../api/user";
import CurrentFact from "../../components/CurrentFact/CurrentFact"; // Using react-icons for better integration

const FavoriteFact = () => {
    const [facts,setFacts]=useState([])
    const [isLoading,setIsLoading]=useState(true);
    useEffect(() => {
        const func=async ()=>{
            setIsLoading(true)
            const res=await getFavoriteFacts()
            if (res){
                console.log('res:',res);
                setFacts(res)
            }
            setIsLoading(false)
        }
        func()
    }, []);
    const [currentFact,setCurrentFact]=useState();
    return (
        <main className="flex-1 p-8 overflow-y-auto ml-16 bg-bg">
            <h2 className="text-2xl text-primary mb-6">Favorite Facts</h2>
            <CurrentFact data={currentFact}/>
            {isLoading ? "Loading...":facts.length ?  <Facts setCurrentFact={(fact)=>setCurrentFact(fact)} facts={facts}/>:"No favorite facts"}
        </main>
    );
};

export default FavoriteFact;
