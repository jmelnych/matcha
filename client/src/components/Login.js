import React, {Component} from 'react'
import {Form, Input, Button} from 'antd'
import {connect} from 'react-redux'
import {getUser} from '../actions/userActions'
import {addFlashMessage} from '../actions/flashMessages'
import PropTypes from 'prop-types'


class Login extends Component {
    state = {
        email: '',
        password: '',
        showResendLink: false
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    toggleResend = () => {
        const {showResendForm} = this.props;
        showResendForm(this.state.email);
    };

    toggleResendPassword = () => {
        const {showResendPasswordForm} = this.props;
        showResendPasswordForm(this.state.email);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {form, getUser, addFlashMessage} = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                getUser(values).then(
                    (res) => {
                        if (res.data === 'no user') {
                            addFlashMessage({
                                type: 'error',
                                text: "No such user exists"
                            });
                        }
                        else if(res.data === 'wrong password'){
                            addFlashMessage({
                                type: 'error',
                                text: "Wrong password"
                            });
                        } else if(res.data === 'no activation') {
                            addFlashMessage({
                                type: 'warning',
                                text: "Please, activate your email"
                            });
                            this.setState({
                                showResendLink: true
                            })
                        } else {
                            console.log('redirect on success');
                            this.context.router.history.push('/profile');
                        }
                    }
                );
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout      = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
            }
        };
        return (
            <div>
                <Form className="App-form" onSubmit={this.onSubmit}>
                    <Form.Item {...formItemLayout} label='E-mail'> {
                        getFieldDecorator('email', {
                            rules: [{type: 'email', message: 'e-mail is not valid'},
                                {required: true, message: 'Please input your E-mail'}]
                        })(<Input name='email'
                                  onChange={e => this.onChange(e)}/>)
                    }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='Password'> {
                        getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your password'}]
                        })(<Input name='password' type='password'
                                  onChange={e => this.onChange(e)}/>)
                    }
                    <a onClick={() => this.toggleResendPassword()}>Forgot your password?</a>
                    </Form.Item>
                    {(this.state.showResendLink) ? <p>Didn't get a link? <a onClick={() => this.toggleResend()}>Get it once again</a></p>: ''}
                    <Button className="App-button" type='primary' htmlType='submit'>Login</Button>
                </Form>
            </div>
        )
    }
}

Login.propTypes = {
    getUser: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    showResendForm: PropTypes.func.isRequired,
    showResendPasswordForm: PropTypes.func.isRequired
};

Login.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, {getUser, addFlashMessage})(Form.create()(Login));