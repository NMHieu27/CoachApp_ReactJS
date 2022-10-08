import axiosClient from './axiosClient';
const coachGarageAPI = {
    postAddGarage: (params) => {
        const url = '/coachgarage/addcoachgarage';
        return axiosClient.post(url, params);
    },
};
export default coachGarageAPI;
