import React, { Component } from 'react'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Layout} from 'antd'
import 'antd/dist/antd.css'
import "./styles.css"
import Signup from './components/Signup'
import Login from './components/Login'
import Auth from './components/Auth'
import store from './store'


class App extends Component {
 render() {
 	return (
 		<Provider store={store}>
 		<Layout className="App">
 		<Layout.Header></Layout.Header>
		<BrowserRouter>
			<Switch>
				<Route exact path="/signup" render={ props => <Signup {...props}/>} />
				<Route exact path="/login" render={ props => <Login {...props}/>} />
				<Route exact path="/auth" render={ props => <Auth {...props}/>} />
			</Switch>
		</BrowserRouter>
		<Layout.Footer>footer</Layout.Footer>
		</Layout>
		</Provider>
 		)}
}


ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();


