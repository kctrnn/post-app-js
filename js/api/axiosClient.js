import AppConstants from '../appConstants.js';

const axiosClient = axios.create({
  baseURL: AppConstants.API_URL,
  headers: {
    'content-type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },

  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
