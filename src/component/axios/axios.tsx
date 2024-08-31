import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000/api'
})

const useAxios = () => {
   return axiosSecure
};

export default useAxios;