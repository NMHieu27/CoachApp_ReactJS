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
    getTicketByUserId: (id) => {
        const url = `/user/ticket/user/${id}`;
        return axiosClient.get(url);
    },
};
export default ticketAPI;
