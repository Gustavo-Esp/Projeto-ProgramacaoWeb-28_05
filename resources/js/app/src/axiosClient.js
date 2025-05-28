import axios from "axios";

const axiosClient = axios.create({
    baseURL:'http://localhost:8000/api',
});


axiosClient.interceptors.request.use(function (config){
    config.headers['Accept']='application/json';
    return config;
});

export default axiosClient;