import axiosClient from '../axiosClient';
const userAPI = {
    getUserById: (id) => {
        const url = `/user/${id}`;
        return axiosClient.get(url);
    },
    updateUser: (params) => {
        const url = '/user/update';
        return axiosClient.put(url, params);
    },
};
export default userAPI;
