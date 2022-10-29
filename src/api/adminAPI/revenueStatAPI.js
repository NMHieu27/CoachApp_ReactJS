import axiosClient from '../axiosClient';
const revenueStatAPI = {
    getRevenueMonthStat: (month, year) => {
        const url = `/admin/stat/month/?month=${month}&year=${year}`;
        return axiosClient.get(url);
    },
    getRevenueQuarterStat: (quarter, year) => {
        const url = `/admin/stat/quarter/?quarter=${quarter}&year=${year}`;
        return axiosClient.get(url);
    },
    getRevenueYearStat: (year) => {
        const url = `/admin/stat/year/?year=${year}`;
        return axiosClient.get(url);
    },
};
export default revenueStatAPI;
