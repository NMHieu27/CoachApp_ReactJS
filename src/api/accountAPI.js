import axiosClient from './axiosClient';
const accountAPI = {
    postUpdateInfo: (params) => {
        const url = '/user/update';
        return axiosClient.put(url, params);
    },
};
export default accountAPI;
