import React, { Component } from 'react'
import {Form, Input, Button} from 'antd'
import {resendActivation} from '../actions/userActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Resend extends Component {

    onSubmit = (e) => {
        e.preventDefault();
        const {form, resendActivation} = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                resendActivation(values);
                console.log('resending activation');
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
                      getFieldDecorator('email', {initialValue: this.props.emailValue},{
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
                  <Button className="App-button" type='primary' htmlType='submit'>Resend link activation</Button>
              </Form>
          </div>
        );
      }
}

Resend.propTypes = {
    resendActivation: PropTypes.func.isRequired
}

export default connect(null, {resendActivation})(Form.create()(Resend));