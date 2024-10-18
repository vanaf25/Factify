import LoaderAnimated from './../../../assets/LoaderAnimated.gif'
const LoaderComponent = () => {
    return (
        <div>
            <img style={{height:250}} className={"height-[150px]"} src={LoaderAnimated} height={150} alt={"Loading"}/>
        </div>
    );
};

export default LoaderComponent;