import axiosClient from '../axiosClient';
const shippingAPI = {
    getShippingByUserId: (id) => {
        const url = `/user/shipping/user/${id}`;
        return axiosClient.get(url);
    },
};
export default shippingAPI;
