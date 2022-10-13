import axiosClient from './axiosClient';
const categoryAPI = {
    getAll: () => {
        const url = '/category/';
        return axiosClient.get(url);
    },
    postAddCategory: (params) => {
        const url = '/category/add';
        return axiosClient.post(url, params);
    },
    deleteCategoryById: (id) => {
        const url = `/category/delete/${id}`;
        return axiosClient.delete(url);
    },
    getCategoryById: (id) => {
        const url = `/category/${id}`;
        return axiosClient.get(url);
    },
    updateCategory: (params) => {
        const url = '/category/update';
        return axiosClient.put(url, params);
    },
};
export default categoryAPI;
