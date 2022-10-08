import axiosClient from './axiosClient';

const userAPI = {
    getUserById: (id) => {
        const url = `/user/${id}`;
        return axiosClient.get(url);
    },
};

export default userAPI;
