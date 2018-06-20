import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Layout} from 'antd'
import Profile from './Profile'
import Signup from './Signup'
import Login from './Login'
import store from '../store'
//import 'antd/dist/antd.css'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
            <Layout className="App">
            <Layout.Header>Header</Layout.Header>
            <BrowserRouter>
            <Switch>
            <Route exact path="/signup" render={ props => <Signup {...props}/>} />
        <Route exact path="/login" render={ props => <Login {...props}/>} />
        <Route exact path="/profile" render={ props => <Profile {...props}/>} />
        </Switch>
        </BrowserRouter>
        <Layout.Footer>footer</Layout.Footer>
        </Layout>
        </Provider>
    )}
}

export default App;

// class App extends Component {
//     render() {
//         return (
//             <h1>Hello from client</h1>
//     )}
// }
//
// export default App;