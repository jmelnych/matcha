import React, { Component } from 'react'
import FlashMessagesList from './Flash/FlashMessagesList'
import {Layout, Menu} from 'antd'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logoutUser} from '../actions/userActions'
import PropTypes from 'prop-types'

class HeaderNav extends Component {
    logout = () => {
        this.props.logoutUser();
    };
    render() {
        const {Header} = Layout;
        const {auth} = this.props;
        const linkStyle = {
            textDecoration: 'none',
            zIndex: '2'
        };

        let tab;
        const _urlArr = (window.location.href).split('/');
        const _curl = _urlArr[_urlArr.length - 1];
        if (_curl === '') {
            tab = '1';
        } else if (_curl === 'search') {
            tab = '2';
        } else if (_curl === 'match') {
            tab = '3';
        } else if (_curl === 'messenger') {
            tab = '4';
        } else if(_curl === 'notifications') {
            tab = '5';
        }

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

                  <Menu.Item key="1"><Link to='/' style={linkStyle}>Profile</Link></Menu.Item>
                  <Menu.Item key="2"><Link to='/search' style={linkStyle}>Search</Link></Menu.Item>
                  <Menu.Item key="3"><svg className="heart" viewBox="-1 -1 34 32">
                      <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                        c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg>
                      <Link to='/match' style={linkStyle}>Match</Link></Menu.Item>
                  <Menu.Item key="4"><Link to='/messenger' style={linkStyle}>Messenger</Link></Menu.Item>
                  <Menu.Item key="5"><Link to='/notifications' style={linkStyle}>Notifications</Link></Menu.Item>
                  <Menu.Item key="6"><Link to='/' onClick={this.logout} style={linkStyle}>Logout</Link></Menu.Item>
              </Menu>
              }
          </Header>
          <FlashMessagesList/>
      </div>
    );
  }
};

function mapStateToProps({user}) {
    return user;
};

HeaderNav.propTypes = {
    user: PropTypes.object,
    logoutUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {logoutUser})(HeaderNav);
