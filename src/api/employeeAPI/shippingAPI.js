import axiosClient from '../axiosClient';
const shippingAPI = {
    getShippingByCoachesId: (id) => {
        const url = `/employee/shipping/coaches/${id}`;
        return axiosClient.get(url);
    },
    getShippingById: (id) => {
        const url = `/employee/shipping/${id}`;
        return axiosClient.get(url);
    },
    addShipping: (params) => {
        const url = '/employee/shipping/add';
        return axiosClient.post(url, params);
    },
    updateShipping: (params) => {
        const url = '/employee/shipping/update';
        return axiosClient.post(url, params);
    },
    deleteShipping: (id) => {
        const url = `/employee/shipping/delete/${id}`;
        return axiosClient.delete(url);
    },
};
export default shippingAPI;
