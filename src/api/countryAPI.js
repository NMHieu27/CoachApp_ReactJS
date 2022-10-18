import axiosClient from './axiosClient';
const countryAPI = {
    getAll: () => {
        const url = '/country/';
        return axiosClient.get(url);
    },
};

export default countryAPI;
