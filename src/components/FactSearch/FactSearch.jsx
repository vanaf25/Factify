import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import './FactSearch.css'
import {getFact} from "../../api/facts";
import History from "../../pages/History/History";
import {getHistory} from "../../api/user";
const FactSearch = () => {
    const { register, handleSubmit } = useForm()
    const [data,setData]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const [histories,setHistories]=useState([])
    const [isHistoryLoading,setIsHistoryLoading]=useState(false);
    const onSubmitHandle=async (data)=>{
        console.log('data:',data);
        setIsLoading(true)
        const resData=await getFact(data.fact)
        setData(resData);
        console.log("d:",resData);
        setHistories(prevState =>{
            const withoutLastElem=prevState.length===15 ?
                prevState.slice(0,prevState.length-1):prevState
            return [resData,...withoutLastElem]
        });
        setIsLoading(false)
    }
    useEffect(() => {
        const func=async ()=>{
            setIsHistoryLoading(true)
            const facts=await getHistory();
            setHistories(facts)
            setIsHistoryLoading(false)
            console.log('facts:',facts)
        }
        func();
    }, []);
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
                    <h4>Claim: {data.title}</h4>
                    <p className={`rating ${String(data.truthStatus)}`}>
                        Truth status:{String(data.truthStatus)}</p>
                    <p className="severity high">Severity: {data.severity}</p>
                    <p>Explanation: {data.explanation}</p>
                    <div className="key-facts">
                        <h4>Key Facts:</h4>
                        <ul>
                            {data?.keyFacts?.map(el => <li>{el}</li>)}
                        </ul>
                    </div>
                    <ul>
                        {data.references?.map((el,index)=>{
                            return <li  key={index}>
                                <a className={"text-primary"} target={"_blank"}  rel='noopener noreferrer' href={el?.url}>{el?.title}</a>
                            </li>
                        })}
                    </ul>
                </div>
            </div> : ""}
            {isHistoryLoading ? <div>Loading...</div>:
                <History histories={histories}   setCurrentFact={(fact)=>setData(fact)}/>}
        </div>
    );
};

export default FactSearch;