import axiosClient from './axiosClient';
const coachesAPI = {
    getAll: (page, size) => {
        const url = `/coaches/?page=${page}&size=${size}`;
        return axiosClient.get(url);
    },
    getCoachesByDate: (date) => {
        const url = `/coaches/?date=${date}`;
        return axiosClient.get(url);
    },
    deleteCoaches: (id) => {
        const url = `/coaches/delete/${id}`;
        return axiosClient.delete(url);
    },
    postAddCoaches: (params) => {
        const url = '/coaches/add';
        return axiosClient.post(url, params);
    },
    getCoachesById: (id) => {
        const url = `/coaches/${id}`;
        return axiosClient.get(url);
    },
    getCoachesByOwnerId: (id) => {
        const url = `/coaches/owner/${id}`;
        return axiosClient.get(url);
    },
    updateCoaches: (params) => {
        const url = '/coaches/update';
        return axiosClient.put(url, params);
    },
};

export default coachesAPI;
