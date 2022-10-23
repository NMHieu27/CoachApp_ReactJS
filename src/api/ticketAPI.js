import axiosClient from './axiosClient';
const ticketAPI = {
    getTicketByCoachesId: (id) => {
        const url = `/ticket/get-by-coachesId/${id}`;
        return axiosClient.get(url);
    },
    getTicketById: (id) => {
        const url = `/ticket/${id}`;
        return axiosClient.get(url);
    },
    getAllTicket: (page, size) => {
        const url = `/ticket/?page=${page}&size=${size}`;
        return axiosClient.get(url);
    },
    postAddTicket: (params) => {
        const url = '/ticket/add';
        return axiosClient.post(url, params);
    },
    updateTicket: (params) => {
        const url = '/ticket/edit';
        return axiosClient.put(url, params);
    },
    deleteTicket: (id) => {
        const url = `/ticket/delete/${id}`;
        return axiosClient.delete(url);
    },
};
export default ticketAPI;
