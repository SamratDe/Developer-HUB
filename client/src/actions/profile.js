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

export const getProfiles = () => async (dispatch) => {
	dispatch({ type: actionTypes.CLEAR_PROFILE })

	try {
		const res = await axios.get('/api/profile')
		dispatch({
			type: actionTypes.GET_PROFILES,
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

export const getProfileById = (userId) => async (dispatch) => {
	dispatch({ type: actionTypes.CLEAR_PROFILE })

	try {
		const res = await axios.get(`/api/profile/user/${userId}`)
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

export const getGithubRepos = (username) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/github/${username}`)
		dispatch({
			type: actionTypes.GET_GITHUB_REPOS,
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
		window.scrollTo(0, 0)
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

export const addExperience = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const res = await axios.put('/api/profile/experience', formData, config)
		dispatch({
			type: actionTypes.UPDATE_PROFILE,
			payload: res.data,
		})
		window.scrollTo(0, 0)
		dispatch(setAlert('Experience Added', 'success'))
		history.push('/dashboard')
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

export const addEducation = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const res = await axios.put('/api/profile/education', formData, config)
		dispatch({
			type: actionTypes.UPDATE_PROFILE,
			payload: res.data,
		})
		window.scrollTo(0, 0)
		dispatch(setAlert('Education Added', 'success'))
		history.push('/dashboard')
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

export const deleteExperience = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`)
		dispatch({
			type: actionTypes.UPDATE_PROFILE,
			payload: res.data,
		})
		window.scrollTo(0, 0)
		dispatch(setAlert('Experience removed', 'success'))
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

export const deleteEducation = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/education/${id}`)
		dispatch({
			type: actionTypes.UPDATE_PROFILE,
			payload: res.data,
		})
		window.scrollTo(0, 0)
		dispatch(setAlert('Education removed', 'success'))
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

export const deleteAccount = () => async (dispatch) => {
	if (window.confirm('Are You sure ? This CANNOT be undone !')) {
		try {
			await axios.delete('/api/profile')
			dispatch({ type: actionTypes.CLEAR_PROFILE })
			dispatch({ type: actionTypes.DELETE_ACCOUNT })
			dispatch(setAlert('Your Account is Deleted'))
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
}
