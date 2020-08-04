const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
	const token = req.header('x-auth-token')

	if (!token) {
		return res.status(401).json({ msg: 'Authorization denied' })
	}

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'))
		req.user = decoded.user
		next()
	} catch (err) {
		console.error('something wrong with auth middleware')
		res.status(401).json({ msg: 'Authorization Expired or Server Error' })
	}
}
