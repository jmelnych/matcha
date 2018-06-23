import React, {Component} from 'react'
import Login from './Login'
import Signup from './Signup'
import {Layout} from 'antd'

const {Content} = Layout;

class Home extends Component {
    state = {
        show_login: true
    }

    toggleFormSignup = (e) => {
        this.setState({show_login: false});

    }
    toggleFormLogin = (e) => {
        this.setState({show_login: true});

    }
    render () {
        return(
            <div className="App-home">
                <Content className="App-content">
                <ul className="tabs">
                    <li className={(this.state.show_login) ? 'left-border tabs-active' : 'left-border'}
                        onClick={e => this.toggleFormLogin(e)}>
                        Login
                        </li>
                    <li className={(this.state.show_login) ? '' : 'tabs-active'}
                        onClick={e => this.toggleFormSignup(e)}>
                        Sign up
                    </li>
                </ul>
                {(this.state.show_login) ? <Login/> : <Signup toggle={this.toggleFormLogin}/>}
                </Content>
            </div>
        )
    }
}

export default Home;