import axiosClient from '../axiosClient';
const ticketAPI = {
    getAll: (page, size) => {
        const url = `/admin/ticket/?page=${page}&size=${size}`;
        return axiosClient.get(url);
    },
    getTicketByCoachesId: (id) => {
        const url = `/admin/ticket/coaches/${id}`;
        return axiosClient.get(url);
    },
    getTicketById: (id) => {
        const url = `/admin/ticket/${id}`;
        return axiosClient.get(url);
    },
    updateTicket: (params) => {
        const url = '/admin/ticket/update';
        return axiosClient.put(url, params);
    },
    deleteTicket: (id) => {
        const url = `/admin/ticket/delete/${id}`;
        return axiosClient.delete(url);
    },
    getRequestCancelTicket: () => {
        const url = '/admin/ticket/request';
        return axiosClient.get(url);
    },
    acceptRequestCancel: (id) => {
        const url = `/admin/ticket/refund/accept/${id}`;
        return axiosClient.put(url);
    },
    rejectRefundTicket: (id) => {
        const url = `/admin/ticket/refund/reject/${id}`;
        return axiosClient.put(url);
    },
};
export default ticketAPI;
