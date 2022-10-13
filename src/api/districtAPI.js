import axiosClient from './axiosClient';
const districtAPI = {
    getAll: () => {
        const url = '/district';
        return axiosClient.get(url);
    },
};
export default districtAPI;
