import React, { Component } from 'react'
import FlashMessagesList from './Flash/FlashMessagesList'
import {Layout, Menu, Icon} from 'antd'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logoutUser} from '../actions/userActions'
import {getMessageHistory, setNote, cleanNotes} from '../actions/chatActions'
import {socket} from "./Root";
import PropTypes from 'prop-types'

class HeaderNav extends Component {
    componentDidMount() {
        socket.on('notification', (data) => {
            this.props.setNote(data);
        });
    }

    componentDidUpdate(prevProps){
        if (this.props.user.user.id !== prevProps.user.user.id) {
            const {id} = this.props.user.user;
            this.props.getMessageHistory(id);
        }
    };

    logout = () => {
        this.props.logoutUser();
    };

    readNotes = () => {
        this.props.cleanNotes();
    };

    render() {
        const {Header} = Layout;
        const {auth} = this.props.user;
        const linkStyle = {
            textDecoration: 'none',
            zIndex: '2'
        };

        const navNoteExistStyle = {
            display: 'block'
        };
        const navNoteNoneStyle = {
            display: 'none'
        };

        let tab;
        const _urlArr = (window.location.href).split('/');
        if(_urlArr.length){
            const _curl = _urlArr[_urlArr.length - 1];
            if (_curl === '') {
                tab = '1';
            } else if (_curl === 'search' || Number.isInteger(Number(_curl))) {
                tab = '2';
            } else if (_curl === 'match') {
                tab = '3';
            } else if (_curl === 'messenger') {
                tab = '4';
            } else if(_curl === 'notifications') {
                tab = '5';
            }
        };
        const unread_messages = this.props.chat.filter(message => message.read === 0) || [];
        const unread_notes = [];
    return (
      <div>
          <label className="toggle-menu">☰ Menu</label>
          <input type="checkbox" name="toggle" id="menu" className="toggle-menu"/>
          <Header>
              {auth &&
              <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={[tab]}
                  style={{ lineHeight: '64px' }}>
                  <Menu.Item key="1"><Link to='/' style={linkStyle}>
                      <Icon type="home" />Home</Link></Menu.Item>
                  <Menu.Item key="2"><Link to='/search' style={linkStyle}>
                      <Icon type="search" />Search</Link></Menu.Item>
                  <Menu.Item key="3">
                      <Link to='/match' style={linkStyle}>
                          <Icon type="heart-o" />Match</Link></Menu.Item>
                  <Menu.Item key="4"><Link to='/messenger' style={linkStyle}>
                      <span className="nav-note"
                            style = {unread_messages.length && tab !== '4' ? navNoteExistStyle : navNoteNoneStyle}>&#9679;</span>
                      <Icon type="message" />Messenger</Link></Menu.Item>
                  <Menu.Item key="5" onClick={this.readNotes}><Link to='/notifications' style={linkStyle}>
                      <span className="nav-note"
                            style = {unread_notes.length && tab !== '5' ? navNoteExistStyle : navNoteNoneStyle}>&#9679;</span>
                      <Icon type="notification" /> Notifications</Link></Menu.Item>
                  <Menu.Item key="6"><Link to='/' onClick={this.logout} style={linkStyle}>
                      <Icon type="logout" />Logout</Link></Menu.Item>
              </Menu>
              }
          </Header>
          <FlashMessagesList/>
      </div>
    );
  }
};

function mapStateToProps({user, chat}) {
    return {user, chat};
};

HeaderNav.propTypes = {
    user: PropTypes.object,
    logoutUser: PropTypes.func.isRequired,
    cleanChatNotes: PropTypes.func.isRequired,
    cleanNotes: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {logoutUser, setNote, cleanChatNotes, cleanNotes, getMessageHistory})(HeaderNav);
