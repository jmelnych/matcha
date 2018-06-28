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
import {checkSession} from '../actions/userActions'

class App extends Component {
    componentWillMount() {
        checkSession().then((res) => {
            this.setState({
                path: res.data
            })
        })
    };
    state = {
        path: false
    };

    render() {

        return (
            <Provider store={store}>
            <Layout className="App">
            <Layout.Header></Layout.Header>
                <FlashMessagesList/>
            <BrowserRouter>

                {this.state.path ?  <Route exact path="/" render={ props => <Profile {...props}/>} />
                    :
                <Route exact path="/" render={ props => <Home {...props}/>} />
                }
        </BrowserRouter>
        <Layout.Footer></Layout.Footer>
        </Layout>
        </Provider>
    )}
}
//<Route exact path="/password/:token"render={ props => <Profile {...props}/>} />

export default App;