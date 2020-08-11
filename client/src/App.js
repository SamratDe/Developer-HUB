import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css'
import Navbar from './components/Layout/Navbar'
import Landing from './components/Layout/Landing'
import LogIn from './components/auth/LogIn'
import Register from './components/auth/Register'

const App = () => {
	return (
		<BrowserRouter>
			<Fragment>
				<Navbar />
				<Route exact path='/' component={Landing} />
				<section className='container'>
					<Switch>
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={LogIn} />
					</Switch>
				</section>
			</Fragment>
		</BrowserRouter>
	)
}

export default App
