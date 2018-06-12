import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
//mport { ApolloProvider } from 'react-apollo'
//import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { Layout} from 'antd'
import 'antd/dist/antd.css'
import Routes from './routes'
import "./styles.css";


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
		<Routes />
		<Layout.Footer>footer</Layout.Footer>
		</Layout>
 		)}
}




ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
