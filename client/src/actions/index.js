import axios from 'axios';
import { AUTH_USER , AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';
const ROOT_URL = 'http://localhost:3090';


export const signinUser = (email, password, history) =>  async dispatch => {
    try {
        const response = await axios.post(`${ROOT_URL}/signin`, {email, password});
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/feature');
    } catch (err) {

        dispatch(authError('Bad Login Info'));
    }
};

export const signupUser = (email, password, history) => async dispatch => {

    try {
        const response = await axios.post(`${ROOT_URL}/signup`, {email, password});
        history.push('/feature');
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
    } catch (error) {
        dispatch(authError(error.response ? error.response.data.error : 'Something went wrong'));
    }
};

export const authError = error => {
    return {
        type: AUTH_ERROR,
        payload: error
    }
};

export const signoutUser = () => {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER };
};

export const fetchMessage = () => async dispatch => {
    try {
        const response = await axios.get(ROOT_URL, { headers : { authorization: localStorage.getItem('token') } });
        dispatch({ type: FETCH_MESSAGE, payload: response.data.message })
    } catch (err) {
    }
};