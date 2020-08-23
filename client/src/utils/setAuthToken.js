import axios from 'axios'

// if the token is there it will add it to the headers
// and
// if the token is not there it will delete it from the headers
const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token
	} else {
		delete axios.defaults.headers.common['x-auth-token']
	}
}

export default setAuthToken
