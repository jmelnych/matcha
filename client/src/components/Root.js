import React, { Component } from 'react'
import '../../../node_modules/antd/dist/antd.css'
import  '../css/styles'
import {Layout} from 'antd'
import Profile from './Profile'
import Home from './Home'
import {getUser} from '../actions/userActions'
import {connect} from 'react-redux'
import HeaderNav from './HeaderNav'
import {Route, Switch} from 'react-router-dom'
import Search from './Search'
import PropTypes from 'prop-types'

class Root extends Component {
    componentDidMount() {
        this.props.isAuth();
    }
    render() {
        const {Footer} = Layout;
        return (
            <Layout className="App">
                <HeaderNav/>
                <Switch>
                    <Route exact path='/' component={!this.props.auth ? Home : Profile}/>
                    <Route path='/search' component={Search}/>
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

//<Route exact path="/password/:token"render={ props => <Profile {...props}/>} />
    {/*<Route exact path="/" component={Root}/>*/}
    {/*<Route path={"profile"} render={Profile}></Route>*/}
    {/*<Route path={"home"} render={Home}></Route>*/}

