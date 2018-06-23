import React, {Component} from 'react'
import Login from './Login'
import Signup from './Signup'
import {Layout} from 'antd'
import Resend from './Resend'

const {Content} = Layout;

class Home extends Component {
    state = {
        show_login: true,
        resend_activation: false
    }

    toggleFormSignup = () => {
        this.setState({show_login: false});

    }
    toggleFormLogin = () => {
        this.setState({show_login: true});

    }

    toggleFormResend = () => {
        this.setState({resend_activation: true})
    }
    render () {
        if (!this.state.resend_activation) {
            return(
                <div className="App-home">
                    <Content className="App-content">
                        <ul className="tabs">
                            <li className={(this.state.show_login) ? 'left-border tabs-active' : 'left-border'}
                            onClick={e => this.toggleFormLogin(e)}>
                            Login</li>
                            <li className={(this.state.show_login) ? '' : 'tabs-active'}
                            onClick={e => this.toggleFormSignup(e)}>
                            Sign up</li>
                        </ul>
                        {(this.state.show_login)?
                            <Login resend={this.toggleFormResend}/> :
                            <Signup toggle={this.toggleFormLogin}/>}
                        </Content>
                </div>
            )
        } else {
            return(<div className="App-home">
                <Content className="App-content">
                    <Resend />
                </Content>
            </div>)
        }
    }
}

export default Home;