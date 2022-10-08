import axiosClient from './axiosClient';

const signupAPI = {
    postSignUp: (params) => {
        const url = '/user/signup';
        return axiosClient.post(url, params);
    },
};

export default signupAPI;
