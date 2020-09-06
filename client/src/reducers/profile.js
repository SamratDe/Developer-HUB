import * as actionTypes from '../actions/types'

const intialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {},
}

export default function (state = intialState, action) {
	switch (action.type) {
		case actionTypes.GET_PROFILE:
		case actionTypes.UPDATE_PROFILE:
			return {
				...state,
				profile: action.payload,
				loading: false,
			}
		case actionTypes.GET_PROFILES:
			return {
				...state,
				profiles: action.payload,
				loading: false,
			}
		case actionTypes.GET_GITHUB_REPOS:
			return {
				...state,
				repos: action.payload,
				loading: false,
			}
		case actionTypes.CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				repos: [],
				loading: false,
			}
		case actionTypes.PROFILE_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
				profile: null,
			}
		default:
			return state
	}
}
