import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { addEducation } from '../../actions/profile'

const AddEducation = ({ addEducation, history }) => {
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	})
	const [toDateDisabled, toggleDisabled] = useState(false)
	const {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description,
	} = formData

	const onChangeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
		addEducation(formData, history)
	}

	return (
		<Fragment>
			<h1 className='large text-primary'>Add An Education</h1>
			<p className='lead'>
				<i className='fas fa-code-branch'></i>
				Add any school/bootcamp that you have attended
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={(e) => onSubmitHandler(e)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* College or School'
						name='school'
						value={school}
						onChange={(e) => onChangeHandler(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Degree or Certificate'
						name='degree'
						value={degree}
						onChange={(e) => onChangeHandler(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Field of Study'
						value={fieldofstudy}
						onChange={(e) => onChangeHandler(e)}
						name='fieldofstudy'
					/>
				</div>
				<div className='form-group'>
					<h4>From Date</h4>
					<input
						type='date'
						name='from'
						value={from}
						onChange={(e) => onChangeHandler(e)}
					/>
				</div>
				<div className='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							value={current}
							checked={current}
							onChange={(e) => {
								setFormData({ ...formData, current: !current })
								toggleDisabled(!toDateDisabled)
							}}
						/>{' '}
						Still studying
					</p>
				</div>
				<div className='form-group'>
					<h4>To Date</h4>
					<input
						type='date'
						name='to'
						value={to}
						onChange={(e) => onChangeHandler(e)}
						disabled={toDateDisabled ? 'disabled' : ''}
					/>
				</div>
				<div className='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='About the Degree'
						value={description}
						onChange={(e) => onChangeHandler(e)}
					></textarea>
				</div>
				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</Fragment>
	)
}

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(withRouter(AddEducation))
