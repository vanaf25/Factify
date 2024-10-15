import axios from "axios";

const instance = axios.create({
    baseURL: 'https://fast-check-psi.vercel.app/',
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`,
    }
});
export default instance