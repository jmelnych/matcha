import React, { Component } from 'react'
import registerServiceWorker from './registerServiceWorker'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//mport { ApolloProvider } from 'react-apollo'
//import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { Layout} from 'antd'
import 'antd/dist/antd.css'
import "./styles.css"
import Signup from './components/Signup'
import Login from './components/Login'
import Auth from './components/Auth'


// const networkInterface = createNetworkInterface({
// 	uri: 'http://localhost:3001/graphql'
// });

// const client = new ApolloClient({
// 	networkInterface: networkInterface
// })

class App extends Component {
 render() {
 	return (
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
 		)}
}




ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();


