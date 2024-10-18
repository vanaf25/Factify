import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import './FactSearch.css'
import {getFact} from "../../api/facts";
import History from "../../pages/History/History";
import {getHistory} from "../../api/user";
import {FaCopy} from "react-icons/fa";
import LoaderComponent from "../global/Loader/Loader";
import CurrentFact from "../CurrentFact/CurrentFact";
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
             <CurrentFact data={data}/>
            {isHistoryLoading ? <LoaderComponent/> :
                <History
                    onDeleteFact={onDeleteFact}
                    histories={histories} setCurrentFact={(fact)=>setData(fact)}/>}
        </div>
    );
};

export default FactSearch;