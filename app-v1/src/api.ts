import axios from 'axios';

import { Configuration, AuthApi, PlacesApi, UsersApi } from './openapi';

const config = new Configuration();
const axiosInstance = axios.create();
const url = process.env.EXPO_PUBLIC_API_URL;

const authApi = new AuthApi(config, url, axiosInstance);
const placesApi = new PlacesApi(config, url, axiosInstance);
const usersApi = new UsersApi(config, url, axiosInstance);

export { authApi, placesApi, usersApi };
