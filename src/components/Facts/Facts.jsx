import Fact from "./Fact/Fact";
const Facts = ({facts,setCurrentFact}) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facts?.map((fact, index) => (
             <Fact setCurrentFact={setCurrentFact} fact={fact} key={index}/>
            ))}
        </div>
    );
};

export default Facts;