import axios from 'axios'

import { setAlert } from './alert'
import * as actionTypes from './types'

export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/me')
		dispatch({
			type: actionTypes.GET_PROFILE,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: actionTypes.PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const res = await axios.post('/api/profile/', formData, config)
		dispatch({
			type: actionTypes.GET_PROFILE,
			payload: res.data,
		})
		dispatch(
			setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
		)
		if (!edit) {
			history.push('/dashboard')
		}
	} catch (err) {
		const errors = err.response.data.errors
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
		}
		dispatch({
			type: actionTypes.PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}
