import axios from 'axios';
const headers = {};

const axiosInstance = axios.create({
  baseURL:
    'https://h5w1ohbj6f.execute-api.ap-southeast-1.amazonaws.com/develop',
  headers,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log('error: ', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return new Promise((resolve, reject) => {
      resolve(response);
    });
  },
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.response.status === 403) {
      // LOGOUT
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
);

export default axiosInstance;
