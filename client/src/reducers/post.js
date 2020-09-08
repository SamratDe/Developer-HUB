import * as actionTypes from '../actions/types'

const initalState = {
	posts: [],
	post: null,
	loading: true,
	error: {},
}

export default function (state = initalState, action) {
	switch (action.type) {
		case actionTypes.GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false,
			}
		case actionTypes.GET_POST:
			return {
				...state,
				post: action.payload,
				loading: false,
			}
		case actionTypes.UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload.postId
						? { ...post, likes: action.payload.likes }
						: post
				),
				loading: false,
			}
		case actionTypes.ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts],
				loading: false,
			}
		case actionTypes.DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(
					(post) => post._id !== action.payload
				),
				loading: false,
			}
		case actionTypes.ADD_COMMENT:
			return {
				...state,
				post: { ...state.post, comments: action.payload },
				loading: false,
			}
		case actionTypes.REMOVE_COMMENT:
			return {
				...state,
				post: {
					...state.post,
					comments: state.post.comments.filter(
						(cmnt) => cmnt._id !== action.payload
					),
				},
				loading: false,
			}
		case actionTypes.POST_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			}
		default:
			return state
	}
}
