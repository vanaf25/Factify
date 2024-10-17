import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import './FactSearch.css'
import {getFact} from "../../api/facts";
import History from "../../pages/History/History";
import {getHistory} from "../../api/user";
import {FaCopy} from "react-icons/fa";
import LoaderComponent from "../global/Loader/Loader";
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
            setIsHistoryLoading(false);
            console.log('facts:',facts)
        }
        func();
    }, []);
    const onDeleteFact=(factId)=>setHistories(prevState =>prevState.filter(el=>el._id!==factId));
    const handleCopy = () => {
        // Prepare the text to be copied to the clipboard
        const keyFacts = data?.keyFacts?.map(el => `- ${el}`).join('\n') || '';
        const references = data?.references?.map(el => `${el.title} (${el.url})`).join('\n') || '';

        const textToCopy = `
      Claim: ${data.title}
      Truth status: ${data.truthStatus}
      Severity: ${data.severity}
      Explanation: ${data.explanation}
      Key Facts:
      ${keyFacts}
      
      References:
      ${references}
    `;

        // Copy the text to the clipboard
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Added fact!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };
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
            {isLoading ? <LoaderComponent/>:""}
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
                    <ul className={"mb-1"}>
                        {data.references?.map((el, index) => {
                            return <li key={index}>
                                <a className={"text-primary"} target={"_blank"} rel='noopener noreferrer'
                                   href={el?.url}>{el?.title}</a>
                            </li>
                        })}
                    </ul>
                    <button
                        className="cursor-pointer text-primary text-[35px] transition-opacity duration-300 hover:opacity-70"
                        onClick={handleCopy}
                    >
                        <FaCopy/>
                    </button>
                </div>
            </div> : ""}
            {isHistoryLoading ? <LoaderComponent/> :
                <History onDeleteFact={onDeleteFact} histories={histories} setCurrentFact={(fact)=>setData(fact)}/>}
        </div>
    );
};

export default FactSearch;