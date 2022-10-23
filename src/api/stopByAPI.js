import axiosClient from './axiosClient';
const stopByAPI = {
    getStopByCountryId: (id) => {
        const url = `/stopby/country/${id}`;
        return axiosClient.get(url);
    },
    getPickUpByCoachesId: (id) => {
        const url = `/coaches-stop-by/pick-up/coaches/${id}`;
        return axiosClient.get(url);
    },
    getDropOffByCoachesId: (id) => {
        const url = `/coaches-stop-by/drop-off/coaches/${id}`;
        return axiosClient.get(url);
    },
};
export default stopByAPI;
