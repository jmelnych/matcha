import React, { Component } from 'react'
import {Form, Input, Button} from 'antd'
import {addFlashMessage} from '../actions/flashMessages'
import {updatePassword} from '../actions/userActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class SetPassword extends Component {
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
        const { form, addFlashMessage, updatePassword } = this.props;
        const {token} = this.props.match.params;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const password = values.password;
                updatePassword(password, token).then(
                (res) => {
                    if (res.data === 'Success'){
                        addFlashMessage({
                            type: 'success',
                            text: 'Your password has been successfully changed'
                        });
                        console.log(this.props.router);
                    } else {
                        addFlashMessage({
                            type: 'error',
                            text: 'Some error occurred'
                        });
                    }
                })
                this.context.router.history.push('/');
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
    console.log(this.context);
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
      <div className="loading">
          <Form className="App-form" onSubmit={this.onSubmit}>
              <Form.Item {...formItemLayout} label='New Password' hasFeedback> {
                  getFieldDecorator('password', {
                      rules: [{
                          required: true, message: 'Please input your password'},
                          {validator: this.validateComplex},
                          {validator: this.validateToNextPassword}]
                  })(<Input name='password' type='password'/>)
              }
              </Form.Item>
              <Form.Item {...formItemLayout} label="Confirm password" >{
                  getFieldDecorator('confirm_password', {
                      rules: [{required: true, message: 'Please confirm your password'},
                          {validator: this.compareToFirstPassword}]
                  })(<Input name='confirm_password' type='password'
                            onBlur={this.handleBlur}
                            onChange={e => this.onChange(e)}/>
                  )}
              </Form.Item>
              <Button className="App-button" type='primary'
                      htmlType='submit'>Save</Button>
          </Form>
      </div>
    );
  }
};

SetPassword.contextTypes = {
    router: PropTypes.object.isRequired
};
export default connect(null, {updatePassword, addFlashMessage})(Form.create()(SetPassword));
