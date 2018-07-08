import React, { Component } from 'react'
import {Form, Input, Button} from 'antd'
import {addFlashMessage} from '../actions/flashMessages'
import {updatePassword} from '../actions/userActions'
import {connect} from 'react-redux'

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
        const { form, addFlashMessage, toggle, updatePassword } = this.props;
        const {token} = this.props.match.params;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const password = values.password;
                updatePassword(password, token).then(
                (res) => {
                    //console.log(res.data);
                    if (res.data === 'Success'){
                        addFlashMessage({
                            type: 'success',
                            text: 'Your password has been successfully changed'
                        });
                        toggle();
                    } else {
                        addFlashMessage({
                            type: 'error',
                            text: 'Some error occured'
                        });
                        toggle();
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

    return (
      <div className="loading">
          <Form className="App-form" onSubmit={this.onSubmit}>
              <Form.Item {...formItemLayout} label='Password' hasFeedback> {
                  getFieldDecorator('password', {
                      rules: [{
                          required: true, message: 'Please input your password'},
                          {validator: this.validateComplex},
                          {validator: this.validateToNextPassword}]
                  })(<Input name='password' type='password'/>)
              }
              </Form.Item>
              <Form.Item {...formItemLayout} label="Confirm Password" >{
                  getFieldDecorator('confirm_password', {
                      rules: [{required: true, message: 'Please confirm your password'},
                          {validator: this.compareToFirstPassword}]
                  })(<Input name='confirm_password' type='password'
                            onBlur={this.handleBlur}
                            onChange={e => this.onChange(e)}/>
                  )}
              </Form.Item>
              <Button className="App-button" type='primary'
                      htmlType='submit'>Save new password</Button>
          </Form>
      </div>
    );
  }
}
export default connect(null, {updatePassword, addFlashMessage})(Form.create()(SetPassword));