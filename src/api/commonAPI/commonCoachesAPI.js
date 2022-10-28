import axiosClient from '../axiosClient';
const commonCoachesAPI = {
    getCoachesByConditions: (params) => {
        const url = '/common/coaches/conditions';
        return axiosClient.post(url, params);
    },
    getCoachesById: (id) => {
        const url = `/common/coaches/${id}`;
        return axiosClient.get(url);
    },
};
export default commonCoachesAPI;
