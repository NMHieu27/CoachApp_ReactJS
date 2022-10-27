import axiosClient from '../axiosClient';
const coachesAPI = {
    getCoachesByStartDate: (date) => {
        const url = `/employee/coaches/getall/?startTime=${date}`;
        return axiosClient.get(url);
    },
};
export default coachesAPI;
