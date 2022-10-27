import axiosClient from '../axiosClient';
const shippingAPI = {
    getShippingByCoachesId: (id) => {
        const url = `/admin/shipping/coaches/${id}`;
        return axiosClient.get(url);
    },
    getShippingById: (id) => {
        const url = `/admin/shipping/${id}`;
        return axiosClient.get(url);
    },
    updateShipping: (params) => {
        const url = '/admin/shipping/update';
        return axiosClient.put(url, params);
    },
    deleteShipping: (id) => {
        const url = `/admin/shipping/delete/${id}`;
        return axiosClient.delete(url);
    },
};
export default shippingAPI;
