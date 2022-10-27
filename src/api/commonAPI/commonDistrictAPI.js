import axiosClient from '../axiosClient';
const commonDistrictAPI = {
    getAll: () => {
        const url = '/common/district/getall';
        return axiosClient.get(url);
    },
};
export default commonDistrictAPI;
