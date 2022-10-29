import axiosClient from '../axiosClient';
const freqStatAPI = {
    getFreqMonthStat: (month, year, id) => {
        const url = `/garageowner/stat/freq/month/?month=${month}&year=${year}&id=${id}`;
        return axiosClient.get(url);
    },
    getFreqQuarterStat: (quarter, year, id) => {
        const url = `/garageowner/stat/freq/quarter/?quarter=${quarter}&year=${year}&id=${id}`;
        return axiosClient.get(url);
    },
    getFreqYearStat: (year, id) => {
        const url = `/garageowner/stat/freq/year/?year=${year}&id=${id}`;
        return axiosClient.get(url);
    },
};
export default freqStatAPI;
