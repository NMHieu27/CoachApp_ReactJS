import axiosClient from '../axiosClient';
const coachesAPI = {
    getAll: (page, size) => {
        const url = `/admin/coaches/getall/?page=${page}&size=${size}`;
        return axiosClient.get(url);
    },
    getCoachesByCoachId: (page, size, id) => {
        const url = `/admin/coaches/coach/?page=${page}&size=${size}&id=${id}`;
        return axiosClient.get(url);
    },
    getCoachesByStartEndTime: (page, size, start, end) => {
        const url = `/admin/coaches/date/?page=${page}&size=${size}&startTime=${start}&endTime=${end}`;
        return axiosClient.get(url);
    },
    getCoachesById: (id) => {
        const url = `/admin/coaches/${id}`;
        return axiosClient.get(url);
    },
    addCoaches: (params) => {
        const url = '/admin/coaches/add';
        return axiosClient.post(url, params);
    },
    updateCoaches: (params) => {
        const url = '/admin/coaches/update';
        return axiosClient.put(url, params);
    },
    deleteCoaches: (id) => {
        const url = `/api/admin/coaches/delete/${id}`;
        return axiosClient.delete(url);
    },
};
export default coachesAPI;
