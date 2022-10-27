import axiosClient from '../axiosClient';
const ticketAPI = {
    getTicketByCoachesId: (id) => {
        const url = `/employee/ticket/coaches/${id}`;
        return axiosClient.get(url);
    },
    getTicketById: (id) => {
        const url = `/employee/ticket/${id}`;
        return axiosClient.get(url);
    },
    updateTicket: (params) => {
        const url = '/employee/ticket/update';
        return axiosClient.post(url, params);
    },
    deleteTicket: (id) => {
        const url = `/employee/ticket/delete/${id}`;
        return axiosClient.delete(url);
    },
};
export default ticketAPI;
