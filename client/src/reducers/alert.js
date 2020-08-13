import * as actionTypes from '../actions/types'

const intialState = []

export default function (state = intialState, action) {
	switch (action.type) {
		case actionTypes.SET_ALERT:
			return [...state, action.payload]
		case actionTypes.REMOVE_ALERT:
			return state.filter((alert) => alert.id !== action.payload)
		default:
			return state
	}
}
