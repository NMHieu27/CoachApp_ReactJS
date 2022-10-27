import axiosClient from '../axiosClient';
const coachAPI = {
    getAll: (id) => {
        const url = `/garageowner/coachgarage/${id}`;
        return axiosClient.get(url);
    },
    getCoachById: (id) => {
        const url = `/garageowner/coachgarage/coach/${id}`;
        return axiosClient.get(url);
    },
    addCoach: (params) => {
        const url = '/garageowner/coachgarage/coach/add';
        return axiosClient.post(url, params);
    },
    updateCoach: (params) => {
        const url = '/garageowner/coachgarage/coach/update';
        return axiosClient.put(url, params);
    },
    deleteCoach: (id) => {
        const url = `/garageowner/coachgarage/coach/delete/${id}`;
        return axiosClient.delete(url);
    },
};
export default coachAPI;
