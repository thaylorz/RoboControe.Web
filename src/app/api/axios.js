import axios from 'axios';

const BASE_URL = 'https://robocontroleapi-app-202403260946.delightfulisland-79d19479.brazilsouth.azurecontainerapps.io/';

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
