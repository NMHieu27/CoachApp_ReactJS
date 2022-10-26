import axiosClient from '../axiosClient';
const coachAPI = {
    getAll: () => {
        const url = '/admin/coach/getall';
        return axiosClient.get(url);
    },
    getCoachById: (id) => {
        const url = `/admin/coach/${id}`;
        return axiosClient.get(url);
    },
    getCoachByCoachGarageId: (id) => {
        const url = `/admin/coach/coachgarage/${id}`;
        return axiosClient.get(url);
    },
    addCoach: (params) => {
        const url = '/admin/coach/add';
        return axiosClient.post(url, params);
    },
    updateCoach: (params) => {
        const url = '/admin/coach/update';
        return axiosClient.put(url, params);
    },
    deleteCoach: (id) => {
        const url = `/admin/coach/delete/${id}`;
        return axiosClient.delete(url);
    },
};
export default coachAPI;
