import axiosClient from '../axiosClient';
const freqStatAPI = {
    getFreqMonthStat: (month, year) => {
        const url = `/admin/stat/freq/month/?month=${month}&year=${year}`;
        return axiosClient.get(url);
    },
    getFreqQuarterStat: (quarter, year) => {
        const url = `/admin/stat/freq/quarter/?quarter=${quarter}&year=${year}`;
        return axiosClient.get(url);
    },
    getFreqYearStat: (year) => {
        const url = `/admin/stat/freq/year/?year=${year}`;
        return axiosClient.get(url);
    },
};
export default freqStatAPI;
