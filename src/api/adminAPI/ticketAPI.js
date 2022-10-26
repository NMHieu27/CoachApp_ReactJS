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
};
export default ticketAPI;
