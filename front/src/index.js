import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
//mport { ApolloProvider } from 'react-apollo'
//import { ApolloClient, createNetworkInterface } from 'react-apollo'
import 'antd/dist/antd.css'
import Routes from './routes'

// const networkInterface = createNetworkInterface({
// 	uri: 'http://localhost:3001/graphql'
// });

// const client = new ApolloClient({
// 	networkInterface: networkInterface
// })

const App = () => (
	 	<Routes />
	);




ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
