import axiosClient from '../axiosClient';
const commonCoachesAPI = {
    getCoachesByConditions: (params) => {
        const url = '/common/coaches/conditions';
        return axiosClient.post(url, params);
    },
    getCoachesById: (id) => {
        const url = `/common/coaches/${id}`;
        return axiosClient.get(url);
    },
    getCoachesModify: (
        startTime,
        endTime,
        startDate,
        endPointId,
        startPointId,
        minPrice,
        maxPrice,
        pickUpId,
        dropOffId,
        emptySeat,
        coachGarage,
    ) => {
        const url = `/common/coaches/?startTime=${startTime}&endTime=${endTime}&startDate=${startDate}&endPoint=${endPointId}&startPoint=${startPointId}&minPrice=${minPrice}&maxPrice=${maxPrice}&pickUp=${pickUpId}&dropOff=${dropOffId}&emptySeat=${emptySeat}&coachGarage=${coachGarage}`;
        return axiosClient.get(url);
    },
};
export default commonCoachesAPI;
