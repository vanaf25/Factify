import Loader from './../../../assets/Loader.png'
const LoaderComponent = () => {
    return (
        <div>
            <img style={{height:250}} className={"height-[150px]"} src={Loader} height={150} alt={"Loading"}/>
        </div>
    );
};

export default LoaderComponent;