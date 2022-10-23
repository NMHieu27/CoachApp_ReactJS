import axiosClient from './axiosClient';
const shippingAPI = {
    getShippingByCoachesId: (id) => {
        const url = `/shipping/get-by-coachesId/${id}`;
        return axiosClient.get(url);
    },
    getAllShipping: (page, size) => {
        const url = `/shipping/?page=${page}&size=${size}`;
        return axiosClient.get(url);
    },
    postAddShipping: (params) => {
        const url = '/shipping/add';
        return axiosClient.post(url, params);
    },
    updateShipping: (params) => {
        const url = '/shipping/edit';
        return axiosClient.put(url, params);
    },
    deleteShipping: (id) => {
        const url = `/shipping/delete/${id}`;
        return axiosClient.delete(url);
    },
};
export default shippingAPI;
