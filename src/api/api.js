import axios from "axios";

const instance = axios.create({
    baseURL: 'https://fast-check-b32d4h6ee-vanaf25s-projects.vercel.app/',
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`,
    }
});
export default instance