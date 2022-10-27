import axiosClient from '../axiosClient';
const userAPI = {
    getAll: () => {
        const url = '/admin/user/getall';
        return axiosClient.get(url);
    },
    getUserById: (id) => {
        const url = `/admin/user/${id}`;
        return axiosClient.get(url);
    },
    addUser: (params) => {
        const url = '/admin/user/add';
        return axiosClient.post(url, params, {
            headers: {
                'content-type': 'multipart/form-data',
                // accept: 'multipart/form-data',
            },
        });
    },
    updateUser: (params) => {
        const url = '/admin/user/update';
        return axiosClient.put(url, params, {
            headers: {
                'content-type': 'multipart/form-data',
                // accept: 'multipart/form-data',
            },
        });
    },
    deleteUser: (id) => {
        const url = `/admin/user/delete/${id}`;
        return axiosClient.delete(url);
    },
};
export default userAPI;
