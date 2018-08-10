import React, { Component } from 'react'
import '../../../node_modules/antd/dist/antd.css'
import  '../css/styles'
import {Layout} from 'antd'
import Profile from './Profile/Profile'
import Home from './Home'
import {getUser} from '../actions/userActions'
import {connect} from 'react-redux'
import HeaderNav from './HeaderNav'
import {Route, Switch} from 'react-router-dom'
import Search from './Search/Search'
import PropTypes from 'prop-types'
import Activation from './Activation'
import SetPassword from './Additional/SetPassword'
import Match from './Match'
import NotFound from './Additional/NotFound'
import Messenger from './Messenger/Messenger'
import OtherUserProfile from './Profile/OtherUserProfile'
import Notifications from './Notifications'
import openSocket from 'socket.io-client'

export const socket = openSocket.connect('http://localhost:5000');
class Root extends Component {
    componentDidMount() {
        this.props.isAuth();
        }

    componentWillReceiveProps(newProps) {
        if (newProps.user.id !== this.props.user.id){
            const {id} = newProps.user;
            socket.emit('users', id);
        }
    }
    render() {
        const {Footer} = Layout;
        return (
            //TODO: render pages only when user logged  in
            <Layout className="App">
                <HeaderNav/>
                <Switch>
                    <Route exact path='/' component={this.props.auth ? Profile : Home}/>
                    <Route exact path='/search' component={Search}/> //TODO: handle /search/
                    <Route exact path='/match' component={Match}/>
                    <Route exact path='/messenger' component={Messenger}/>
                    <Route exact path='/activate/:token' component={Activation} />
                    <Route exact path='/password/:token' component={SetPassword} />
                    <Route exact path='/user/:id' component={OtherUserProfile} />
                    <Route exact path='/notifications' component={Notifications} />
                    <Route component={NotFound}/>
                </Switch>
                <Footer>&copy; by imelnych & pkolomiy</Footer>
            </Layout>
        );
      }
};

function mapStateToProps({user}) {
    return user;
}

function mapDispatchToProps(dispatch) {
    return {
        isAuth: () => dispatch(getUser())
    }
};

Root.propTypes = {
    getUser: PropTypes.func,
    user: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);


