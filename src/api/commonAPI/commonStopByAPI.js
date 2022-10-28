import axiosClient from '../axiosClient';
const commonStopByAPI = {
    getStopByCountryId: (id) => {
        const url = `/common/stopby/country/${id}`;
        return axiosClient.get(url);
    },
    getPickUpByCoachesId: (id) => {
        const url = `/common/coaches/pickup/${id}`;
        return axiosClient.get(url);
    },
    getDropOffByCoachesId: (id) => {
        const url = `/common/coaches/dropoff/${id}`;
        return axiosClient.get(url);
    },
};
export default commonStopByAPI;
