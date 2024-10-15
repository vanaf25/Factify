import instance from "./api";

export const getHistory=async (body)=>{
    try {
        console.log(body);
        const response = await instance.get('user/history',{
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