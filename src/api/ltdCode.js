import instance from "./api";

export const generateLtdCode=async (body)=>{
    try {
        const response = await instance.post(`ltdCode/`,body,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data
    } catch (error) {
        console.error('Error fetching data from instance:', error);
        return error
    }
}
export const applyLtdCode=async (code,token)=>{
    try {
        console.log('token:',token);
        const response = await instance.post(`ltdCode/redeem/${code}`);
        return response.data
    } catch (error) {
        console.error('Error fetching data from instance:', error);
        return error
    }
}
export const getLtdCode=async (code)=>{
    try {
        const response = await instance.get(`ltdCode/${code}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data
    } catch (error) {
        return {message:error?.response?.data?.message,status:"error"}
    }
}
export const getLtdCodesOfUser=async (userId)=>{
    try {
        const response = await instance.get(`ltdCode/coupons/${userId}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data
    } catch (error) {
        console.error('Error fetching data from instance:', error);
        return error
    }
}
export const deleteLTDCode=async (codeId)=>{
    try {
        const response = await instance.delete(`ltdCode/${codeId}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data
    } catch (error) {
        console.error('Error fetching data from instance:', error);
        return error
    }
}