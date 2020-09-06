import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import Spinner from '../Layout/Spinner'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'

const Dashboard = ({ getCurrentProfile, deleteAccount, auth, profile }) => {
	useEffect(() => {
		getCurrentProfile()
	}, [getCurrentProfile])

	return profile.loading && profile.profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'>
					Welcome {'   '} {auth.user && auth.user.name}
				</i>
			</p>
			{profile.profile !== null ? (
				<Fragment>
					<DashboardActions />
					<Experience experience={profile.profile.experience} />
					<Education education={profile.profile.education} />
					<div className='my-2'>
						<button
							className='btn btn-danger'
							onClick={() => {
								deleteAccount()
							}}
						>
							<i className='fas fa-user-minus'></i> Delete my
							Account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>
						You have not yet setup a profile. Please add some
						details about you.
					</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	)
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
)
