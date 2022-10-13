import axiosClient from './axiosClient';

const userAPI = {
    getUserById: (id) => {
        const url = `/user/${id}`;
        return axiosClient.get(url);
    },
    getAll: () => {
        const url = '/user/getall';
        return axiosClient.get(url);
    },
    deleteById: (id) => {
        const url = `/user/delete/${id}`;
        return axiosClient.delete(url);
    },
};

export default userAPI;
