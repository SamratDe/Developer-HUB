import React, { Fragment } from 'react'

import './App.css'
import Navbar from './components/Layout/Navbar'
import Landing from './components/Layout/Landing'

const App = () => {
	return (
		<Fragment>
			<Navbar />
			<Landing />
		</Fragment>
	)
}

export default App
