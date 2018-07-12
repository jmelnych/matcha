import React, {Component} from 'react'
import {Form, Input, Radio, Button, DatePicker} from 'antd'
import {connect} from 'react-redux'
import {createUser} from '../actions/userActions'
import {addFlashMessage} from '../actions/flashMessages'
import PropTypes from 'prop-types'
import moment from 'moment'

class Signup extends Component {
    state = {
        conf_value: false
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        /* redirect to page there is a need to extreact contextTypes first*/
        //this.context.router.history.push('/');
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { form, addFlashMessage, createUser, toggle } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.bday = moment(values.bday._d).format('L');
                //console.log('Received values of form: ', values);
                createUser(values).then(
                    (res) => {
                        if (res.data === 'Mail has been sent'){
                            addFlashMessage({
                                type: 'success',
                                text: 'You sign up successfully. Check your email for link activation'
                            });
                            toggle();
                        }
                        else if(res.data === 'Email exists') {
                            addFlashMessage({
                                type: 'error',
                                text: 'User with this email already exists'
                            });
                        }
                    })
            }
        })
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
        const dateFormat = 'MM/DD/YYYY';
        return (
            <div>
                <Form className="App-form" onSubmit={this.onSubmit}>
                    <Form.Item {...formItemLayout} label='E-mail' hasFeedback> {
                        getFieldDecorator('email', {
                            rules: [{type: 'email', message: 'e-mail is not valid'},
                                    {required: true, message: 'Please input your E-mail'}]
                        })(<Input name='email'/>)
                    }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='Username' hasFeedback> {
                        getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your Username'},
                                    {min: 2, message:'Username is too short'}]
                        })(<Input name='username'/>)
                    }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='First name' hasFeedback> {
                        getFieldDecorator('firstname', {
                            rules: [{required: true, message: 'Please input your first name'},
                                    {min: 2, message:'First name is too short'}]
                        })(<Input name='firstname'/>)
                    }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='Last name' hasFeedback> {
                        getFieldDecorator('lastname', {
                            rules: [{required: true, message: 'Please input your last name'},
                                    {min: 2, message:'Last name is too short'}]
                        })(<Input name='lastname'/>)
                    }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='Gender'> {
                        getFieldDecorator('gender', {
                            rules: [{required: true, message: 'Please select your gender'}]
                        })(<Radio.Group name='gender'>
                            <Radio value='male'>Male</Radio>
                            <Radio value='female'>Female</Radio>
                        </Radio.Group>)
                    }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='Birth day'> {
                        getFieldDecorator('bday', {initialValue: moment('01/30/1996', dateFormat)},{
                            rules:[{required: true, message: 'Please indicate your birth day'}]
                        })(<DatePicker format={dateFormat} />)
                    }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='Password' hasFeedback> {
                        getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password'},
                                {validator: this.validateComplex},
                                {validator: this.validateToNextPassword}]
                        })(<Input name='password' type='password'/>)
                    }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Confirm Password">{
                        getFieldDecorator('confirm_password', {
                            rules: [{required: true, message: 'Please confirm your password'},
                                {validator: this.compareToFirstPassword}]
                        })(<Input name='confirm_password' type='password'
                                  onBlur={this.handleBlur}
                                  onChange={e => this.onChange(e)}/>
                        )}
                    </Form.Item>
                    <Button className="App-button" type='primary'
                            htmlType='submit'>Sign up</Button>
                </Form>
            </div>
        )
    }
}

Signup.propTypes = {
    createUser: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired
}


export default connect(null, {createUser, addFlashMessage})(Form.create()(Signup));