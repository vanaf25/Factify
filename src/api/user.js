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
export const getFavoriteFacts=async (body)=>{
    try {
        console.log(body);
        const response = await instance.get('user/favoriteFacts',{
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

export const addToFavorite=async (factId)=>{
    try {
        const response = await instance.post(`user/favoriteFacts/${factId}`,{
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

export const removeFromFavorite=async (factId)=>{
    try {
        const response = await instance.delete(`user/favoriteFacts/${factId}`,{
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