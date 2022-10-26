import axiosClient from '../axiosClient';
const categoryAPI = {
    getAll: () => {
        const url = '/admin/category/getall';
        return axiosClient.get(url);
    },
    getCategoryById: (id) => {
        const url = `/admin/category/${id}`;
        return axiosClient.get(url);
    },
    addCategory: (params) => {
        const url = '/admin/category/add';
        return axiosClient.post(url, params);
    },
    updateCategory: (params) => {
        const url = '/admin/category/update';
        return axiosClient.put(url, params);
    },
    deleteCategory: (id) => {
        const url = `/admin/category/delete/${id}`;
        return axiosClient.delete(url);
    },
};
export default categoryAPI;
