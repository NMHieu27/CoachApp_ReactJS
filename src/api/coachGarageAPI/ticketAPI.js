import axiosClient from '../axiosClient';
const ticketAPI = {
    getTicketByCoachesId: (id) => {
        const url = `/garageowner/coachgarage/coaches/ticket/${id}`;
        return axiosClient.get(url);
    },
};
export default ticketAPI;
