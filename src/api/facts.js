import instance from "./api";

export const getFact=async (fact)=>{
    try {
        const response = await instance.post('fact',{fact},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    } catch (error) {
        console.error('Error fetching data from instance:', error);
        return error
    }
}