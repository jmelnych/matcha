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
import Activation from './Activation'
import SetPassword from './SetPassword'
import Match from './Match'
import NotFound from './NotFound'

class Root extends Component {
    componentDidMount() {
        const _curl = (window.location.href).split('/');
        if (_curl[3] === '' || _curl[3] === 'search' || _curl[3] === 'match') {
            //console.log('checking auth');
            this.props.isAuth();
        } //TODO: fix rendering profile when relinked from 404 page
    }
    render() {
        const {Footer} = Layout;
        return (
            <Layout className="App">
                <HeaderNav/>
                <Switch>
                    <Route exact path='/' component={!this.props.auth ? Home : Profile}/>
                    <Route exact path='/search' component={Search}/> //TODO: handle /search/
                    <Route exact path='/match' component={Match}/>
                    <Route exact path='/activate/:token' component={Activation} />
                    <Route exact path='/password/:token' component={SetPassword} />
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

//<Route exact path="/password/:token"render={ props => <Profile {...props}/>} />
    {/*<Route exact path="/" component={Root}/>*/}
    {/*<Route path={"profile"} render={Profile}></Route>*/}
    {/*<Route path={"home"} render={Home}></Route>*/}

