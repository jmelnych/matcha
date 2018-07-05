import React, { Component } from 'react'
import '../../../node_modules/antd/dist/antd.css'
import  '../css/styles'
import {Layout} from 'antd'
import FlashMessagesList from './flash/FlashMessagesList'
import Profile from './Profile'
import Home from './Home'
import {checkSession} from '../actions/userActions'
import {connect} from 'react-redux'

class Root extends Component {
render() {
    return (
        <Layout className="App">
            <Layout.Header>header</Layout.Header>
            <FlashMessagesList/>
            {this.props.user ? <Home/> : <Profile/>}
            <Layout.Footer></Layout.Footer>
        </Layout>
    );
  }
};

function mapStateToProps({user}) {
    return user;
}

export default connect(mapStateToProps)(Root);

//<Route exact path="/password/:token"render={ props => <Profile {...props}/>} />
    {/*<Route exact path="/" component={Root}/>*/}
    {/*<Route path={"profile"} render={Profile}></Route>*/}
    {/*<Route path={"home"} render={Home}></Route>*/}

