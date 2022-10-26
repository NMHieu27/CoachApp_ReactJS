import axiosClient from '../axiosClient';
const coachGarageAPI = {
    getAll: () => {
        const url = '/admin/coachgarage/getall';
        return axiosClient.get(url);
    },
    getCoachGarageById: (id) => {
        const url = `/admin/coachgarage/${id}`;
        return axiosClient.get(url);
    },
    getCoachGarageRequest: () => {
        const url = '/admin/coachgarage/request';
        return axiosClient.get(url);
    },
    addCoachGarage: (params) => {
        const url = '/admin/coachgarage/add';
        return axiosClient.post(url, params);
    },
    updateCoachGarage: (params) => {
        const url = '/admin/coachgarage/update';
        return axiosClient.put(url, params);
    },
    acceptGarageRequest: (id) => {
        const url = `/admin/coachgarage/accept/${id}`;
        return axiosClient.put(url);
    },
    rejectGarageRequest: (id) => {
        const url = `/admin/coachgarage/reject/${id}`;
        return axiosClient.put(url);
    },
    deleteCoachGarage: (id) => {
        const url = `/admin/coachgarage/delete/${id}`;
        return axiosClient.delete(url);
    },
};
export default coachGarageAPI;
