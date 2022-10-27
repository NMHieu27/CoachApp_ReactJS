import axiosClient from '../axiosClient';
const commonCoachesAPI = {
    getCoachesByConditions: (params) => {
        const url = '/common/coaches/conditions';
        return axiosClient.post(url, params);
    },
};
export default commonCoachesAPI;
