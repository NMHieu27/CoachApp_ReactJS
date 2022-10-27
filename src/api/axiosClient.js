// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';

// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(
    async (config) => {
        // Handle refresh token
        if (config.url.indexOf('/auth/signin') >= 0 || config.url.indexOf('/auth/token/refresh') >= 0) {
            return config;
        }
        const { accessToken, expiredTime } = await axiosClient.getLocalAccessToken();
        // accessToken && config.headers.Authorization = accessToken;
        if (accessToken) {
            config.headers.Authorization = accessToken;

            console.log(`{accessToken, expiredTime}`, { accessToken, expiredTime });
            const now = new Date().getTime();
            console.log(`timeExpired:::${expiredTime} vs::now::${now}`);
            if (+expiredTime <= +now + 5 * 60 * 1000) {
                try {
                    console.log('AccessToken expired!!');
                    const params = {
                        accessToken: accessToken,
                    };
                    const response = await refreshToken(params);
                    if (response.code === 200) {
                        const newAccessToken = response.data.accessToken;
                        const newExpiredTime = response.data.expiredTime;
                        if (newAccessToken) {
                            config.headers.Authorization = newAccessToken;
                        }
                        console.log({ newAccessToken, newExpiredTime });
                        await axiosClient.setLocalAccessToken(newAccessToken, newExpiredTime);
                        return config;
                    }
                } catch (error) {
                    return Promise.reject(error);
                }
            }
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // Handle errors
        throw error;
    },
);

async function refreshToken(params) {
    const url = '/auth/token/refresh';
    return await axiosClient.post(url, params);
}
axiosClient.setLocalAccessToken = async (accessToken, expiredTime) => {
    window.localStorage.setItem('accessToken', accessToken);
    window.localStorage.setItem('expiredTime', expiredTime);
};
axiosClient.getLocalAccessToken = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    const expiredTime = window.localStorage.getItem('expiredTime');
    return { accessToken, expiredTime };
};
export default axiosClient;
