import axios from 'axios';

class axiosService {

    constructor() {
        let token = sessionStorage.getItem('token');

        if (token !== null) {
            axios.interceptors.request.use(function (config) {
                config.headers.Authorization = `Bearer ${token}`;
                return config;
            }, function (err) {
                return Promise.reject(err);
            });
        }
    }

    get(url) {
        return axios.get(url);
    }

    post(url, data, config) {
        return axios.post(url, data, config);
    }

    put(url, data, config) {
        return axios.put(url, data, config);
    }

    delete(url) {
        return axios.delete(url);
    }

}

export default new axiosService()