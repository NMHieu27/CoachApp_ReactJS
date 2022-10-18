import axiosClient from './axiosClient';
const stopByAPI = {
    getStopByCountryId: (id) => {
        const url = `/stopby/country/${id}`;
        return axiosClient.get(url);
    },
};
export default stopByAPI;
