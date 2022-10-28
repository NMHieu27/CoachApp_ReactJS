import axiosClient from '../axiosClient';
const coachAPI = {
    getCoachByUserId: (id) => {
        const url = `/garageowner/coachgarage/coach/user/${id}`;
        return axiosClient.get(url);
    },
    getCoachById: (id) => {
        const url = `/garageowner/coachgarage/coach/${id}`;
        return axiosClient.get(url);
    },
    addCoach: (params) => {
        const url = '/garageowner/coachgarage/coach/add';
        return axiosClient.post(url, params, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // accept: 'multipart/form-data',
            },
        });
    },
    updateCoach: (params) => {
        const url = '/garageowner/coachgarage/coach/update';
        return axiosClient.put(url, params, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // accept: 'multipart/form-data',
            },
        });
    },
    deleteCoach: (id) => {
        const url = `/garageowner/coachgarage/coach/delete/${id}`;
        return axiosClient.delete(url);
    },
};
export default coachAPI;
