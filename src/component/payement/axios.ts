import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://rental-bike-service.vercel.app/api'
})

const useAxiosSecure = () => {
   return axiosSecure
};

export default useAxiosSecure;