import axiosClient from '../axiosClient';
const revenueStatAPI = {
    getRevenueMonthStat: (month, year, id) => {
        const url = `/garageowner/stat/month/?month=${month}&year=${year}&id=${id}`;
        return axiosClient.get(url);
    },
    getRevenueQuarterStat: (quarter, year, id) => {
        const url = `/garageowner/stat/quarter/?quarter=${quarter}&year=${year}&id=${id}`;
        return axiosClient.get(url);
    },
    getRevenueYearStat: (year, id) => {
        const url = `/garageowner/stat/year/?year=${year}&id=${id}`;
        return axiosClient.get(url);
    },
};
export default revenueStatAPI;
