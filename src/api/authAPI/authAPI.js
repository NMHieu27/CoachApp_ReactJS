import axiosClient from '../axiosClient';
const authAPI = {
    signIn: (params) => {
        const url = '/auth/signin';
        return axiosClient.post(url, params);
    },
    signUp: (params) => {
        const url = '/auth/signup';
        return axiosClient.post(url, params, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
    },
    refreshToken: (params) => {
        const url = '/auth/token/refresh';
        return axiosClient.post(url, params);
    },
};
export default authAPI;
