import axiosClient from './axiosClient';
const statsAPI = {
    getRevenueStatsByDay: (fromDate, toDate) => {
        const url = `/stats/getRevenueStat/?from=${fromDate}&to=${toDate}`;
        return axiosClient.get(url);
    },
    getRevenueStatsByMonth: (month, year) => {
        const url = `/stats/getRevenueStat/?month=${month}&year=${year}`;
        return axiosClient.get(url);
    },
    getRevenueStatsByQuarter: (quarter, year) => {
        const url = `/stats/getRevenueStat/?quarter=${quarter}&year=${year}`;
        return axiosClient.get(url);
    },
    getRevenueStatsByYear: (year) => {
        const url = `/stats/getRevenueStat/?year=${year}`;
        return axiosClient.get(url);
    },
};
export default statsAPI;
