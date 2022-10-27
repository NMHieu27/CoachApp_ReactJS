import axiosClient from '../axiosClient';
const commonCoachGarageAPI = {
    getAll: () => {
        const url = '/common/coachgarage/';
        return axiosClient.get(url);
    },
};
export default commonCoachGarageAPI;
