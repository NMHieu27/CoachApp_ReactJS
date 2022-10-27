import axiosClient from '../axiosClient';
const coachGarageAPI = {
    registerCoachGarage: (params) => {
        const url = '/user/coachgarage/request';
        return axiosClient.post(url, params);
    },
};
export default coachGarageAPI;
