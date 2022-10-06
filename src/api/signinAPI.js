import axiosClient from './axiosClient';

const signinAPI = {
    postSignIn: (params) => {
        const url = '/user/signin';
        return axiosClient.post(url, params);
    },
};

export default signinAPI;
