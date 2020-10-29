import axios from 'axios';

const dbUrl = 'https://burger-cafe-23ad5.firebaseio.com';

const axiosRequest = axios.create({baseURL: dbUrl});

export {axiosRequest};