import axiosClient from '../axiosClient';
const coachGarageAPI = {
    getCoachGarageByUserId: (id) => {
        const url = `/garageowner/coachgarage/user/${id}`;
        return axiosClient.get(url);
    },
};
export default coachGarageAPI;
