import axios from 'axios';

import {API_URL} from '../../config';
import {actionType} from '../reducers/user';

export const fetchUser = () => (dispatch) => {
	dispatch({type: actionType.FETCH_USER_PENDING});
	axios.get(`${API_URL}/user/`)
		.then((response) => {
			dispatch({
				type: actionType.FETCH_USER_FULFILLED,
				payload: response.data
			});
		})
		.catch((error) => {
			dispatch({
				type: actionType.FETCH_USER_REJECTED,
				payload: error.reponse.data
			})
		});
}

export const clearUser = () => (dispatch) => dispatch({
	type: actionType.CLEAR_USER
});

export const clearUserError = () => (dispatch) => dispatch({
	type: actionType.CLEAR_ERROR
});