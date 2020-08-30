import * as actionTypes from '../actions/types'

const intialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
}

export default function (state = intialState, action) {
	switch (action.type) {
		case actionTypes.REGISTER_SUCCESS:
		case actionTypes.LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			}
		case actionTypes.REGISTER_FAIL:
		case actionTypes.AUTH_ERROR:
		case actionTypes.LOGIN_FAIL:
		case actionTypes.LOGOUT:
		case actionTypes.DELETE_ACCOUNT:
			localStorage.removeItem('token')
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			}
		case actionTypes.USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			}
		default:
			return state
	}
}
