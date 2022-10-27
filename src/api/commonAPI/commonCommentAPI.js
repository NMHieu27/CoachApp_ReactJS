import axiosClient from '../axiosClient';
const commonCommentAPI = {
    getComment: (page, size, coachId, amountRating) => {
        const url = `/common/comment/coach/?page=${page}&size=${size}&coachId=${coachId}&rating=${amountRating}`;
        return axiosClient.get(url);
    },
};
export default commonCommentAPI;
