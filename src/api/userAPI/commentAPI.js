import axiosClient from '../axiosClient';
const commentAPI = {
    addComment: (params) => {
        const url = '/user/comment/add';
        return axiosClient.post(url, params);
    },
};
export default commentAPI;
