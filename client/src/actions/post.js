import axios from 'axios'

import { setAlert } from './alert'
import * as actionTypes from './types'

export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/posts')
		dispatch({
			type: actionTypes.GET_POSTS,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

export const addLike = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/like/${postId}`)
		dispatch({
			type: actionTypes.UPDATE_LIKES,
			payload: { postId, likes: res.data },
		})
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

export const removeLike = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/unlike/${postId}`)
		dispatch({
			type: actionTypes.UPDATE_LIKES,
			payload: { postId, likes: res.data },
		})
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

export const deletePost = (id) => async (dispatch) => {
	try {
		await axios.delete(`/api/posts/${id}`)
		dispatch({
			type: actionTypes.DELETE_POST,
			payload: id,
		})
		window.scrollTo(0, 0)
		dispatch(setAlert('Post Removed', 'success'))
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: {
				msg: err,
				status: err.response.status,
			},
		})
	}
}

export const addPost = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}

	try {
		const res = await axios.post('/api/posts', formData, config)
		dispatch({
			type: actionTypes.ADD_POST,
			payload: res.data,
		})
		window.scrollTo(0, 0)
		dispatch(setAlert('Post Created', 'success'))
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: {
				msg: err,
				status: err.response.status,
			},
		})
	}
}

export const getPost = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/posts/${id}`)
		dispatch({
			type: actionTypes.GET_POST,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

export const addComment = (postId, formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}

	try {
		const res = await axios.post(
			`/api/posts/comment/${postId}`,
			formData,
			config
		)
		dispatch({
			type: actionTypes.ADD_COMMENT,
			payload: res.data,
		})
		dispatch(setAlert('Comment Added', 'success'))
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: {
				msg: err,
				status: err.response.status,
			},
		})
	}
}

export const deleteComment = (postId, commentId) => async (dispatch) => {
	try {
		await axios.delete(`/api/posts/comment/${postId}/${commentId}`)
		dispatch({
			type: actionTypes.REMOVE_COMMENT,
			payload: commentId,
		})
		dispatch(setAlert('Comment Deleted', 'success'))
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: {
				msg: err,
				status: err.response.status,
			},
		})
	}
}
