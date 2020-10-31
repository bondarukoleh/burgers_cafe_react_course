import axios from 'axios';
import {firebaseAPIToken} from '../../config/config';

const dbUrl = 'https://burger-cafe-23ad5.firebaseio.com';
const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseAPIToken}`;

const axiosRequest = axios.create({baseURL: dbUrl});
const loginRequest = axios.create({baseURL: loginUrl});

export {axiosRequest, loginRequest};