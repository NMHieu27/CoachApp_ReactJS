import axiosClient from './axiosClient';
const statsAPI = {
    //admin
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
    getCoachesStatsByMonth: (month, year) => {
        const url = `/stats/getCoachesStat/?month=${month}&year=${year}`;
        return axiosClient.get(url);
    },
    getCoachesStatsByQuarter: (quarter, year) => {
        const url = `/stats/getCoachesStat/?quarter=${quarter}&year=${year}`;
        return axiosClient.get(url);
    },
    getCoachesStatsByYear: (year) => {
        const url = `/stats/getCoachesStat/?year=${year}`;
        return axiosClient.get(url);
    },

    //Garage

    garageGetRevenueStatsByMonth: (month, year, userId) => {
        const url = `/stats/getRevenueStat/?month=${month}&year=${year}&ownerId=${userId}`;
        return axiosClient.get(url);
    },
    garageGetRevenueStatsByQuarter: (quarter, year, userId) => {
        const url = `/stats/getRevenueStat/?quarter=${quarter}&year=${year}&ownerId=${userId}`;
        return axiosClient.get(url);
    },
    garageGetRevenueStatsByYear: (year, userId) => {
        const url = `/stats/getRevenueStat/?year=${year}&ownerId=${userId}`;
        return axiosClient.get(url);
    },

    garageGetCoachesStatsByMonth: (month, year, userId) => {
        const url = `/stats/getCoachesStat/?month=${month}&year=${year}&ownerId=${userId}`;
        return axiosClient.get(url);
    },
    garageGetCoachesStatsByQuarter: (quarter, year, userId) => {
        const url = `/stats/getCoachesStat/?quarter=${quarter}&year=${year}&ownerId=${userId}`;
        return axiosClient.get(url);
    },
    garageGetCoachesStatsByYear: (year, userId) => {
        const url = `/stats/getCoachesStat/?year=${year}&ownerId=${userId}`;
        return axiosClient.get(url);
    },
};
export default statsAPI;
