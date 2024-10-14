import axios from "axios";

const instance = axios.create({
    baseURL: 'https://fast-check-psi.vercel.app/',
});
export default instance