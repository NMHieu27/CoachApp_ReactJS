import axiosClient from './axiosClient';
const coachGarageAPI = {
    postAddGarage: (params) => {
        const url = '/coachgarage/add';
        return axiosClient.post(url, params);
    },
    getAll: () => {
        const url = '/coachgarage';
        return axiosClient.get(url);
    },
    acceptRequest: (id) => {
        const url = `/coachgarage/accept/${id}`;
        return axiosClient.put(url);
    },
    denyRequest: (id) => {
        const url = `/coachgarage/deny/${id}`;
        return axiosClient.delete(url);
    },
    deleteCoachGarage: (id) => {
        const url = `/coachgarage/delete/${id}`;
        return axiosClient.delete(url);
    },
    getCoachGarageById: (id) => {
        const url = `/coachgarage/${id}`;
        return axiosClient.get(url);
    },
    updateCoachGarage: (params) => {
        const url = '/coachgarage/update';
        return axiosClient.put(url, params);
    },
};
export default coachGarageAPI;
