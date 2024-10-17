import Fact from "./Fact/Fact";
import {useState} from "react";
const Facts = ({facts:defaultFacts,setCurrentFact,onDeleteFact}) => {
    const [facts,setFacts]=useState(defaultFacts)
    const deleteFactHandle=(factId)=>{
        setFacts(prevState =>prevState.filter(el=>el._id!==factId));
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facts?.map((fact) => (
             <Fact onDeleteFact={deleteFactHandle} setCurrentFact={setCurrentFact} fact={fact} key={fact._id}/>
            ))}
        </div>
    );
};

export default Facts;