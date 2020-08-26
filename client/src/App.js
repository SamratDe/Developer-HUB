import React, { Fragment, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import './App.css'
import Navbar from './components/Layout/Navbar'
import Landing from './components/Layout/Landing'
import LogIn from './components/auth/LogIn'
import Register from './components/auth/Register'
import Alert from './components/Layout/Alert'
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'

if (localStorage.token) {
	setAuthToken(localStorage.token)
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser())
	}, [])

	return (
		<Provider store={store}>
			<BrowserRouter>
				<Fragment>
					<Navbar />
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route
								exact
								path='/register'
								component={Register}
							/>
							<Route exact path='/login' component={LogIn} />
							<PrivateRoute
								exact
								path='/dashboard'
								component={Dashboard}
							/>
						</Switch>
					</section>
				</Fragment>
			</BrowserRouter>
		</Provider>
	)
}

export default App
