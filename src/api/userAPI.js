import axiosClient from './axiosClient';

const userAPI = {
    getUserById: (id) => {
        const url = `/admin/user/${id}`;
        return axiosClient.get(url);
    },
    getAll: (accessToken) => {
        const url = '/admin/user/getall';
        return axiosClient.get(url, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        });
    },
    deleteById: (id) => {
        const url = `/user/delete/${id}`;
        return axiosClient.delete(url);
    },
};

export default userAPI;
