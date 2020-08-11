import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

const LogIn = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const { email, password } = formData

	const inputChangeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const submitHandler = (e) => {
		e.preventDefault()
	}

	return (
		<Fragment>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Log Into Your Account
			</p>
			<form className='form' onSubmit={(e) => submitHandler(e)}>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => inputChangeHandler(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						minLength='6'
						value={password}
						onChange={(e) => inputChangeHandler(e)}
					/>
				</div>
				<input
					type='submit'
					className='btn btn-primary'
					value='LogIn'
				/>
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Sign Up</Link>
			</p>
		</Fragment>
	)
}

export default LogIn
