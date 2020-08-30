const express = require('express')
const config = require('config')
const { body, validationResult } = require('express-validator')
const axios = require('axios')

const Profile = require('../../models/Profile')
const User = require('../../models/User')
const auth = require('../../middleware/auth')
const Post = require('../../models/Post')

const router = express.Router()

router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate('user', ['name', 'avatar'])

		if (!profile) {
			return res
				.status(400)
				.json({ msg: 'There is no profile for this user' })
		}
		res.json(profile)
	} catch (err) {
		console.error(err.message)
		res.status(500).json({ msg: 'Server Error' })
	}
})

router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', [
			'name',
			'avatar',
		])
		res.json(profiles)
	} catch (err) {
		console.error(err.message)
		res.status(500).json({ msg: 'Server Error' })
	}
})

router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate('user', ['name', 'avatar'])
		if (!profile) {
			return res.status(400).json({ msg: 'Profile not found' })
		}
		res.json(profile)
	} catch (err) {
		console.error(err.message)
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' })
		}
		res.status(500).json({ msg: 'Server Error' })
	}
})

router.get('/github/:username', async (req, res) => {
	try {
		const uri = encodeURI(
			`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
		)
		const headers = {
			'user-agent': 'node.js',
			Authorization: `token ${config.get('githubToken')}`,
		}
		const gitHubResponse = await axios.get(uri, { headers })
		res.json(gitHubResponse.data)
	} catch (err) {
		console.error(err.message)
		if (err.response.status === 404) {
			return res.status(404).json({ msg: 'No GitHub profile found' })
		}
		res.status(500).json({ msg: 'Server Error' })
	}
})

router.post(
	'/',
	[
		auth,
		[
			body('status', 'Status is required').not().isEmpty(),
			body('skills', 'Skills is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const {
			company,
			location,
			website,
			bio,
			skills,
			status,
			githubusername,
			youtube,
			twitter,
			instagram,
			linkedin,
			facebook,
		} = req.body

		const profileFields = {}
		profileFields.user = req.user.id
		if (company) profileFields.company = company
		if (location) profileFields.location = location
		if (website) profileFields.website = website
		if (bio) profileFields.bio = bio
		if (status) profileFields.status = status
		if (githubusername) profileFields.githubusername = githubusername
		profileFields.skills = skills
			.split(',')
			.map((skill) => ' ' + skill.trim())

		profileFields.social = {}
		if (youtube) profileFields.social.youtube = youtube
		if (twitter) profileFields.social.twitter = twitter
		if (facebook) profileFields.social.facebook = facebook
		if (linkedin) profileFields.social.linkedin = linkedin
		if (instagram) profileFields.social.instagram = instagram

		try {
			let profile = await Profile.findOne({ user: req.user.id })
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				)
				return res.json(profile)
			}

			profile = new Profile(profileFields)
			await profile.save()

			res.json(profile)
		} catch (err) {
			console.error(err.message)
			res.status(500).json({ msg: 'Server Error' })
		}
	}
)

router.put(
	'/experience',
	[
		auth,
		[
			body('title', 'Title is required').not().isEmpty(),
			body('company', 'Company is required').not().isEmpty(),
			body('from', 'From date is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		} = req.body

		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		}

		try {
			const profile = await Profile.findOne({ user: req.user.id })
			profile.experience.unshift(newExp)
			await profile.save()

			res.json(profile)
		} catch (err) {
			console.error(err.message)
			res.status(500).json({ msg: 'Server Error' })
		}
	}
)

router.put(
	'/education',
	[
		auth,
		[
			body('school', 'School is required').not().isEmpty(),
			body('degree', 'Degree is required').not().isEmpty(),
			body('fieldofstudy', 'Field of Study is required').not().isEmpty(),
			body('from', 'From date is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		} = req.body

		const newEdu = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		}

		try {
			const profile = await Profile.findOne({ user: req.user.id })
			profile.education.unshift(newEdu)
			await profile.save()

			res.json(profile)
		} catch (err) {
			console.error(err.message)
			res.status(500).json({ msg: 'Server Error' })
		}
	}
)

router.delete('/', auth, async (req, res) => {
	try {
		await Post.deleteMany({ user: req.user.id })
		await Profile.findOneAndRemove({ user: req.user.id })
		await User.findOneAndRemove({ _id: req.user.id })
		res.json({ msg: 'User Deleted' })
	} catch (err) {
		console.error(err.message)
		res.status(500).json({ msg: 'Server Error' })
	}
})

router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id })
		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.exp_id)
		profile.experience.splice(removeIndex, 1)
		await profile.save()

		res.json(profile)
	} catch (err) {
		console.error(err.message)
		res.status(500).json({ msg: 'Server Error' })
	}
})

router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id })
		const removeIndex = profile.education
			.map((item) => item.id)
			.indexOf(req.params.edu_id)
		profile.education.splice(removeIndex, 1)
		await profile.save()

		res.json(profile)
	} catch (err) {
		console.error(err.message)
		res.status(500).json({ msg: 'Server Error' })
	}
})

module.exports = router
