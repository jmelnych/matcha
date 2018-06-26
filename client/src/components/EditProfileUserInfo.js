import React, { Component } from 'react'
import {Form, Input, Button, Select} from 'antd'

class EditProfileUserInfo extends Component {
    handleInputLength = (rule, value, callback) => {
        if (value && value.length < 3) {
            callback(`${rule.field} is too short`);
        } else {
            callback();
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { form, closeOnSubmit } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form editing: ', values);
                closeOnSubmit();
                //TODO: send obj to backend
            }
        })
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

    const usr = this.props.user;
    return (
      <div>
          <Form onSubmit={this.onSubmit}>
              <Form.Item {...formItemLayout} label='First name'> {
                  getFieldDecorator('firstname', { initialValue: usr.firstname },
                      {
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
                  getFieldDecorator('lastname', {initialValue: usr.lastname}, {
                      rules: [{
                          required: true,
                          message: 'Please input your last name'
                      }, {
                          validator: this.handleInputLength
                      }]
                  })(<Input name='lastname'/>)
              }
              </Form.Item>
              <Form.Item {...formItemLayout} label='Occupancy'> {
                  getFieldDecorator('occupancy', {initialValue: usr.occupancy})
                  (<Input name='occupancy'/>)
              }
              </Form.Item>
              <Form.Item {...formItemLayout} label='Preferences'>
                  <Select defaultValue="Option1">
                      <Select.Option value="Option1">Men</Select.Option>
                      <Select.Option value="Option2">Women</Select.Option>
                      <Select.Option value="Option3">Men and Women</Select.Option>
                  </Select>
              </Form.Item>
              <div >
              <Button className="center-button" type='primary'
                      htmlType='submit'>Save changes</Button></div>
          </Form>
      </div>
    );
  }
}
export default Form.create()(EditProfileUserInfo);