import axiosClient from '../axiosClient';
const ticketAPI = {
    addTicket: (params) => {
        const url = '/user/ticket/add';
        return axiosClient.post(url, params);
    },
    requestCancelTicket: (id) => {
        const url = `/user/refund/${id}`;
        return axiosClient.put(url);
    },
};
export default ticketAPI;
