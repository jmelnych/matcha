import React, { Component } from 'react'
import FlashMessagesList from './flash/FlashMessagesList'
import {Layout, Menu} from 'antd'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class HeaderNav extends Component {
render() {
    const {Header} = Layout;
    const {auth} = this.props;
    const linkStyle = {
        textDecoration: 'none'
    }

    return (
      <div>
          <Header>
              {auth &&
              <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['1']}
                  style={{ lineHeight: '64px' }}>
                  <Menu.Item key="1"><Link to='/' style={linkStyle}>Profile</Link></Menu.Item>
                  <Menu.Item key="2"><Link to='/search' style={linkStyle}>Search</Link></Menu.Item>
                  <Menu.Item key="3"><Link to='/' style={linkStyle}>Logout</Link></Menu.Item>
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
}

export default connect(mapStateToProps)(HeaderNav);
