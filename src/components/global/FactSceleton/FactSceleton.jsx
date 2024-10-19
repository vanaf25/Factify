const FactSceleton = ({isHistory}) => {
    return (
        <div className={" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}>
            <div
                className="bg-cardBg p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between animate-pulse">
                <div className="space-y-2">
                    <div className="w-3/4 h-6 bg-gray-300 rounded-md"></div>
                    <div className="w-1/4 h-4 bg-gray-300 rounded-md"></div>
                </div>
                <div className="flex justify-between mt-4">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    {isHistory ? <div className="flex space-x-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
                    </div> : ""}
                </div>
            </div>
        </div>
    );
};

export default FactSceleton;