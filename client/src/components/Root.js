import React, { Component } from 'react'
import '../../../node_modules/antd/dist/antd.css'
import  '../css/styles'
import {Layout} from 'antd'
import FlashMessagesList from './flash/FlashMessagesList'
import Profile from './Profile'
import Home from './Home'
import {getUser} from '../actions/userActions'
import {connect} from 'react-redux'

class Root extends Component {
    componentDidMount() {
        this.props.getUser();
    }
    render() {
        return (
            <Layout className="App">
                <Layout.Header>header</Layout.Header>
                <FlashMessagesList/>
                {!this.props.auth ? <Home/> : <Profile/>}
                <Layout.Footer></Layout.Footer>
            </Layout>
        );
      }
};

function mapStateToProps({user}) {
    return user;
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: () => dispatch(getUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);

//<Route exact path="/password/:token"render={ props => <Profile {...props}/>} />
    {/*<Route exact path="/" component={Root}/>*/}
    {/*<Route path={"profile"} render={Profile}></Route>*/}
    {/*<Route path={"home"} render={Home}></Route>*/}

