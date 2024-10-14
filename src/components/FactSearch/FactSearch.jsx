import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import './FactSearch.css'
import {getFact} from "../../api/facts";
const FactSearch = () => {
    const { register, handleSubmit } = useForm()
    const [data,setData]=useState(false);
    const [isLoading,setIsLoading]=useState(false)
    const [title,seTitle]=useState("")
    const onSubmitHandle=async (data)=>{
        console.log('data:',data);
        setIsLoading(true)
        const resData=await getFact(data.fact)
        setIsLoading(false)
        setData(resData.summary);
        seTitle(data.fact);
        console.log("d:",resData.summary);
    }
    return (
        <div className="main-content">
            <div className="search-container">
                <h2>Hi Shafi!</h2>
                <form onSubmit={handleSubmit(onSubmitHandle)}>
                    <div className="search-bar">
                        <input {...register("fact")} type="text" placeholder="Enter your query..."/>
                        <button type={"submit"}>Check Facts</button>
                    </div>
                </form>
            </div>
            {isLoading ? <div>Loading...</div>:""}
            {data ? <div className="fact-check-result fade-in" id="fact-check-result">
                <h3>Fact Check Result:</h3>
                <div className="result-item">
                <h4>Claim: {title}</h4>
                    <p className={`rating ${data.evaluation_metrics.truth_status}`}>
                        Truthnless:{data.evaluation_metrics.truth_status}</p>
                    <p className="rating true">Rating: {data.evaluation_metrics.truth_percentage}</p>
                    <p className="severity high">Severity: {data.evaluation_metrics.severity_level}</p>
                    <p>Sentence: {data.incident}</p>
                    <div className="key-facts">
                        <h4>Key Facts:</h4>
                        <ul>
                            {data.key_points.map(el =><li>{el}</li>)}
                        </ul>
                    </div>
                </div>
            </div>:""}
        </div>
    );
};

export default FactSearch;