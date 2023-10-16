import axios from "axios";
import {getFromLocalStorage} from "@/utils/local-storage";

export const instance = axios.create()

instance.interceptors.request.use(function (config) {
    const accessToken = getFromLocalStorage('token')
    if (accessToken) {
        config.headers.Authorization = accessToken
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// @ts-ignore
instance.interceptors.response.use(function (response) {
    return {
        data: response?.data,
    };
}, (error) => {
    if (error.response) {
        return Promise.reject(error.response.data)
    } else if (error.request) {
        return Promise.reject({message: 'Network Error'});
    } else {
        return Promise.reject(error);
    }
});

instance.defaults.headers.post['Content-Type'] = "application/json"
instance.defaults.headers["Accept"] = "application/json"
instance.defaults.timeout = 60000;

