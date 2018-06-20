import React, {Component} from 'react'
import {Form, Input, Radio, Button} from 'antd'
import {Layout} from 'antd'
import Tabs from './Tabs'
import {connect} from 'react-redux'
import {createUser} from '../actions/userActions'

const {Content} = Layout;

class Signup extends Component {
    state = {
        conf_value: false
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const form = this.props.form;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                this.props.createUser(values);
            }
        });
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.conf_value) {
            form.validateFields(['confirm_password'], {force: true});
        }
        callback();
    };

    handleBlur = (e) => {
        const value = e.target.value;
        this.setState({conf_value: this.state.conf_value || !!value});
    };

    handleInputLength = (rule, value, callback) => {
        if (value && value.length < 3) {
            callback(`${rule.field} is too short`);
        } else {
            callback();
        }

    };

    validateComplex = (rule, value, callback) => {
        const pattern = /^(?=.*\d)(?=.*[a-z])\w{6,}$/;
        //console.log(pattern.test(value));
        if (value) {
            if (pattern.test(value)) {
                callback();
            } else {
                callback(`${rule.field} must contain at least one number and
                       lowercase letter, and at least 6 or more characters`);
            }
        } else {
            callback();
        }
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent');
        } else {
            callback();
        }
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
                <Content className="App-content">
                    <Tabs/>
                    <Form className="App-form" onSubmit={this.onSubmit}>
                        <Form.Item {...formItemLayout} label='E-mail'> {
                            getFieldDecorator('email', {
                                rules: [{
                                    type: 'email',
                                    message: 'e-mail is not valid'
                                },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail'
                                    }]
                            })(<Input name='email'/>)
                        }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='Username'> {
                            getFieldDecorator('username', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your Username'
                                }, {
                                    validator: this.handleInputLength
                                }]
                            })(<Input name='username'/>)
                        }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='First name'> {
                            getFieldDecorator('firstname', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your first name'
                                }, {
                                    validator: this.handleInputLength
                                }]
                            })(<Input name='firstname'/>)
                        }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='Last name'> {
                            getFieldDecorator('lastname', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your last name'
                                }, {
                                    validator: this.handleInputLength
                                }]
                            })(<Input name='lastname'
                                      onChange={e => this.onChange(e)}/>)
                        }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='Gender'> {
                            getFieldDecorator('gender', {
                                rules: [{
                                    required: true,
                                    message: 'Please select your gender'
                                }]
                            })(<Radio.Group name='gender'>
                                <Radio value='male'>Male</Radio>
                                <Radio value='female'>Female</Radio>
                            </Radio.Group>)
                        }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='Password'> {
                            getFieldDecorator('password', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your password'
                                }, {
                                    validator: this.validateComplex
                                }, {
                                    validator: this.validateToNextPassword
                                }]
                            })(<Input name='password' type='password'/>)
                        }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Confirm Password">{
                            getFieldDecorator('confirm_password', {
                                rules: [{
                                    required: true, message: 'Please confirm your password'
                                }, {
                                    validator: this.compareToFirstPassword
                                }]
                            })(<Input name='confirm_password' type='password'
                                      onBlur={this.handleBlur}
                                      onChange={e => this.onChange(e)}/>
                            )}
                        </Form.Item>

                        <Button className="App-button" type='primary'
                                htmlType='submit'>Sign up</Button>
                    </Form>
                </Content>
            </div>
        )
    }
}

export default connect(null, {createUser})(Form.create()(Signup));