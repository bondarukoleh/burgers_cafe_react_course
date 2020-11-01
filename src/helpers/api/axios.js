import axios from 'axios';
import {firebaseAPIToken} from '../../config/config';

const dbUrl = 'https://burger-cafe-23ad5.firebaseio.com';
const signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseAPIToken}`;
const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseAPIToken}`;

const axiosRequest = axios.create({baseURL: dbUrl});
const signUpRequest = axios.create({baseURL: signupUrl});
const signInRequest = axios.create({baseURL: signInUrl});

export {axiosRequest, signUpRequest, signInRequest};