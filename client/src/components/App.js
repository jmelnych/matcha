import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Layout} from 'antd'
import Profile from './Profile'
import Home from './Home'
import store from '../store'
import '../../../node_modules/antd/dist/antd.css'
import  '../css/styles'
import FlashMessagesList from './flash/FlashMessagesList'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
            <Layout className="App">
            <Layout.Header></Layout.Header>
                <FlashMessagesList/>
            <BrowserRouter>
            <Switch>
                <Route exact path="/" render={ props => <Home {...props}/>} />
                <Route exact path="/profile" render={ props => <Profile {...props}/>} />
        </Switch>
        </BrowserRouter>
        <Layout.Footer></Layout.Footer>
        </Layout>
        </Provider>
    )}
}

export default App;