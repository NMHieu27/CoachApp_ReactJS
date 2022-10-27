import axiosClient from '../axiosClient';
const commonCategoryAPI = {
    getAll: () => {
        const url = '/common/category/getall';
        return axiosClient.get(url);
    },
};
export default commonCategoryAPI;
