import axiosClient from './axiosClient';
const coachAPI = {
    getAll: () => {
        const url = '/coach';
        return axiosClient.get(url);
    },
    deleteCoach: (id) => {
        const url = `/coach/delete/${id}`;
        return axiosClient.delete(url);
    },
    postAddCoach: (params) => {
        const url = '/coach/add';
        return axiosClient.post(url, params);
    },
    getCoachById: (id) => {
        const url = `/coach/${id}`;
        return axiosClient.get(url);
    },
    updateCoach: (params) => {
        const url = '/coach/update';
        return axiosClient.put(url, params);
    },
};
export default coachAPI;
