import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import './FactSearch.css'
import {getFact} from "../../api/facts";
import History from "../../pages/History/History";
import {getHistory} from "../../api/user";
import LoaderComponent from "../global/Loader/Loader";
import CurrentFact from "../CurrentFact/CurrentFact";
import LoaderSceleton from "../global/LoaderSceleton/LoaderSceleton";
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
            <div className="bg-[var(--card-bg)] p-8 rounded-[20px] shadow-lg mb-8">
                <h2>Hi Shafi!</h2>
                <form className={"w-full"} onSubmit={handleSubmit(onSubmitHandle)}>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 w-full max-w-lg mx-auto">
                        <input
                            type="text"
                            {...register("fact")}
                            placeholder="Enter something..."
                            className="col-span-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                            disabled={isLoading}
                            className={`${isLoading ? 'cursor-not-allowed bg-primary-light opacity-50' : ''} col-span-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300`}>
                            {isLoading ? "checking...":"Check"}
                        </button>
                    </div>
                </form>
            </div>
            {isLoading ? <LoaderSceleton/> : ""}
            <CurrentFact data={data}/>
            {isHistoryLoading ? <LoaderComponent/> :
                <History
                    onDeleteFact={onDeleteFact}
                    histories={histories} setCurrentFact={(fact) => setData(fact)}/>}
        </div>
    );
};

export default FactSearch;