import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Signup from './Signup'
import Login from './Login'
import Auth from './Auth'


export default () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/signup" render={ props => <Signup {...props}/>} />
			<Route exact path="/login" render={ props => <Login {...props}/>} />
			<Route exact path="/auth" render={ props => <Auth {...props}/>} />
		</Switch>
	</BrowserRouter>
	);