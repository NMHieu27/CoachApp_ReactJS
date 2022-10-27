import axiosClient from '../axiosClient';
const shippingAPI = {
    getShippingByCoachesId: (id) => {
        const url = `/garageowner/coachgarage/coaches/shipping/${id}`;
        return axiosClient.get(url);
    },
};
export default shippingAPI;
