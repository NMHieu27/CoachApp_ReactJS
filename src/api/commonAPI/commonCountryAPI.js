import axiosClient from '../axiosClient';
const commonCountryAPI = {
    getAll: () => {
        const url = '/common/country/getall';
        return axiosClient.get(url);
    },
};
export default commonCountryAPI;
