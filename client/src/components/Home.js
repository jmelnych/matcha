import React, {Component} from 'react'
import Login from './Login'
import Signup from './Signup'
import {Layout, Spin} from 'antd'
import ResendActivation from './ResendActivation'
import RemindPassword from './RemindPassword'

const {Content} = Layout;

class Home extends Component {
    componentDidMount() {
        this._timer = setTimeout(() => {this.setState({
            loading: false
        })}, 1500)
    };

    componentWillUnmount() {
        clearTimeout(this._timer);
    };

    state = {
        show_login: true,
        email: '',
        resend_activation: false,
        resend_password: false,
        loading: true
    };

    toggleFormSignup = () => {
        this.setState({show_login: false});

    };
    toggleFormLogin = () => {
        this.setState({show_login: true});
        this.setState({resend_activation: false});
        this.setState({resend_password: false});

    };

    toggleFormResend = (email) => {
        this.setState({resend_activation: true});
        this.setState({email})
    };

    toggleFormResendPassword = (email) => {
        this.setState({resend_password: true});
        this.setState({email})
    };


    render () {
        if (this.state.resend_activation) {
            return(<div className="App-home">
                <Content className="App-content">
                    <ResendActivation toggle={this.toggleFormLogin} emailValue={this.state.email}/>
                </Content>
            </div>)
        } else if(this.state.resend_password){
            return(<div className="App-home">
                <Content className="App-content">
                    <RemindPassword toggle={this.toggleFormLogin} emailValue={this.state.email}/>
                </Content>
            </div>)

        } else if (this.state.loading) {
            return (<Spin size="large" className="loading"/>);
        } else {
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
                            <Login showResendForm={this.toggleFormResend} showResendPasswordForm={this.toggleFormResendPassword}/> :
                            <Signup toggle={this.toggleFormLogin}/>}
                    </Content>
                </div>
            )
        }
    }
}

export default (Home);