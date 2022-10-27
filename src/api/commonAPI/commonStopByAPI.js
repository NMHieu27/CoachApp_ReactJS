import axiosClient from '../axiosClient';
const commonStopByAPI = {
    getStopByCountryId: (id) => {
        const url = `/common/stopby/country/${id}`;
        return axiosClient.get(url);
    },
};
export default commonStopByAPI;
