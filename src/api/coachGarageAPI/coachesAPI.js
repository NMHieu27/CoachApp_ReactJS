import axiosClient from '../axiosClient';
const coachesAPI = {
    getAll: (id) => {
        const url = `/garageowner/coachgarage/coaches/user/${id}`;
        return axiosClient.get(url);
    },
    getCoachesById: (id) => {
        const url = `/garageowner/coachgarage/coaches/${id}`;
        return axiosClient.get(url);
    },
    addCoaches: (params) => {
        const url = '/garageowner/coachgarage/coaches/add';
        return axiosClient.post(url, params);
    },
    updateCoaches: (params) => {
        const url = '/garageowner/coachgarage/coaches/update';
        return axiosClient.put(url, params);
    },
    deleteCoaches: (id) => {
        const url = `/garageowner/coachgarage/coaches/delete/${id}`;
        return axiosClient.delete(url);
    },
};
export default coachesAPI;
