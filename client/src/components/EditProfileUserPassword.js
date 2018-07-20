import React, { Component } from 'react'
import {Form, Input, Button} from 'antd'
import {validatePassword, updatePasswordFromProfile} from '../actions/userActions'
import {connect} from 'react-redux'


class EditProfileUserPassword extends Component {
    state = {
        conf_value: false,
        successPassword: false
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

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { form, closeOnSubmit } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const passwordObj = {
                    password: values.password
                };
                this.props.updatePasswordFromProfile(passwordObj);
                closeOnSubmit();
            }
        })
    };

    validateCurrentPassword = (rule, value, callback) => {
        const passwordObj = {
            password: value
        };
        this.props.validatePassword(passwordObj).then((res) => {
            if (res.data === 'ok') {
                this.setState({
                    successPassword: true
                })
                callback();
            } else {
                callback('current password is wrong');
            }
        });
    }

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
        <Form onSubmit={this.onSubmit}>
            <Form.Item {...formItemLayout} label='Current password' hasFeedback={this.state.successPassword}> {
                getFieldDecorator('current_password', {
                    validateTrigger: "onBlur",
                    rules: [{required: true, message: 'Please input your password'},
                        {validator: this.validateCurrentPassword}]
                })(<Input name='current_password' type='password'/>)
            }
            </Form.Item>
            <Form.Item {...formItemLayout} label='New password' hasFeedback> {
                getFieldDecorator('password', {
                    rules: [{
                        required: true, message: 'Please input your password'},
                        {validator: this.validateComplex},
                        {validator: this.validateToNextPassword}]
                })(<Input name='password' type='password'/>)
            }
            </Form.Item>
            <Form.Item {...formItemLayout} label="Confirm Password" hasFeedback>{
                getFieldDecorator('confirm_password', {
                    rules: [{required: true, message: 'Please confirm your password'},
                        {validator: this.compareToFirstPassword}]
                })(<Input name='confirm_password' type='password'
                          onBlur={this.handleBlur}
                          onChange={e => this.onChange(e)}/>
                )}
            </Form.Item>
            <Button className="center-button" type='primary'
                    htmlType='submit'>Save new password</Button>
        </Form>
    );
  }
}
export default connect(null, {validatePassword, updatePasswordFromProfile})(Form.create()(EditProfileUserPassword));
