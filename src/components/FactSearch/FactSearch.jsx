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
        setData(resData["FactCheckDetails"]);
        seTitle(data.fact);
        console.log("d:",resData["FactCheckDetails"]);
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
                    <p className={`rating ${data.Rating}`}>
                        Truth status:{data.Rating}</p>
                    <p className="severity high">Severity: {data.Severity}</p>
                    <p>Explanation: {data.Explanation}</p>
                    <div className="key-facts">
                        <h4>Key Facts:</h4>
                        <ul>
                            {data?.keyFacts?.map(el => <li>{el}</li>)}
                        </ul>
                    </div>
                    <ul>
                        {data.References?.map((el,index)=>{
                            return <li  key={index}>
                                <a className={"text-primary"} target={"_blank"}  rel='noopener noreferrer' href={el?.url}>{el?.title}</a>
                            </li>
                        })}
                    </ul>
                </div>
            </div> : ""}
        </div>
    );
};

export default FactSearch;