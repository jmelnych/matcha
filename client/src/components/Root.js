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
import NotFound from './UI/NotFound'
import Messenger from './Messenger/Messenger'
import OtherUserProfile from './Profile/OtherUserProfile'
import Notifications from './Notifications'
import openSocket from 'socket.io-client'
import {getBaseURL} from '../config'
import {getMessageHistory, receiveChatMsg} from '../actions/chatActions'
import {fetchHistory, receiveHistoryNote} from '../actions/historyActions'

export const socket = openSocket.connect(getBaseURL());

class Root extends Component {
    constructor(props){
        super(props);
        const {receiveChatMsg, receiveHistoryNote} = this.props;
        /* LISTEN for new incoming chat messages */
        socket.on('chat', (data) => {
            receiveChatMsg(data);
        });
        /* LISTEN for new history notifications */
        socket.on('notification', (data) => {
            receiveHistoryNote(data);
        });
    }
    componentDidMount() {
        this.props.isAuth();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user.id !== this.props.user.id && this.props.user.id){
            /* SETUP new socket connection */
            const {id} = this.props.user;
            socket.emit('users', id);
            /* GRAB chat messages */
            this.props.getMessageHistory(id);
            this.props.fetchHistory(id);
        }
    }
    render() {
        const {Footer} = Layout;
        return (
            <Layout className="App">
                <HeaderNav/>
                <Switch>
                    <Route exact path='/' component={this.props.auth ? Profile : Home}/>
                    <Route exact path='/search' component={this.props.auth ? Search : NotFound}/>
                    <Route exact path='/match' component={this.props.auth ? Match : NotFound}/>
                    <Route exact path='/messenger' component={this.props.auth ? Messenger : NotFound}/>
                    <Route exact path='/activate/:token' component={Activation} />
                    <Route exact path='/password/:token' component={SetPassword} />
                    <Route exact path='/user/:id' component={this.props.auth ? OtherUserProfile : NotFound} />
                    <Route exact path='/notifications' component={this.props.auth ? Notifications : NotFound} />
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
        isAuth: () => dispatch(getUser()),
        getMessageHistory: (id) => dispatch(getMessageHistory(id)),
        fetchHistory: (id) => dispatch(fetchHistory(id)),
        receiveHistoryNote: (data) => dispatch(receiveHistoryNote(data)),
        receiveChatMsg: (data) => dispatch(receiveChatMsg(data))
    }
};

Root.propTypes = {
    getUser: PropTypes.func,
    getMessageHistory: PropTypes.func,
    fetchHistory: PropTypes.func,
    user: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);


