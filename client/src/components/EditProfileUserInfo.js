import React, { Component } from 'react'
import {Form, Input, Button, Select} from 'antd'

class EditProfileUserInfo extends Component {
    componentDidMount() {
        this.setInitialValues();
    }

    onSubmit = (e) => {
        const { form, closeOnSubmit } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form editing: ', values);
                closeOnSubmit();
                //TODO: send obj to backend
            }
        })
    };

    setInitialValues = () => {
        const { form, user } = this.props;
        form.setFieldsValue({
            firstname: user.firstname,
            lastname: user.lastname,
            occupancy: user.occupancy,
            bio: user.bio

        });
    };

render() {
    const {getFieldDecorator} = this.props.form;
    const { user } = this.props;
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


    const { TextArea } = Input;
    return (
      <div>
          <Form onSubmit={this.onSubmit}>
              <Form.Item {...formItemLayout} label='First name'> {
                  getFieldDecorator('firstname', {
                      rules: [{required: true, message: 'Please input your first name'},
                          {min: 2, message:'First name is too short'}]
                  })(<Input  name='firstname'/>)
              }
              </Form.Item>
              <Form.Item {...formItemLayout} label='Last name'> {
                  getFieldDecorator('lastname', {
                      rules: [{required: true, message: 'Please input your last name'},
                             {min: 2, message:'Last name is too short'}]
                  })(<Input name='lastname'/>)
              }
              </Form.Item>
              <Form.Item {...formItemLayout} label='Occupancy'> {
                  getFieldDecorator('occupancy', {
                      rules: [{min: 2, message: 'Your occupation is too short, please, develop'}]
                  })
                  (<Input name='occupancy'/>)
              }
              </Form.Item>
              <Form.Item {...formItemLayout} label='Preferences'> {
                  <Select defaultValue={user.preference}>
                      <Select.Option value="male">Men</Select.Option>
                      <Select.Option value="female">Women</Select.Option>
                      <Select.Option value="both">Men and Women</Select.Option>
                  </Select>
              }
              </Form.Item>
              <Form.Item {...formItemLayout} label='Bio'> {
                  getFieldDecorator('bio', {
                      validateTrigger: 'onBlur',
                      rules: [{max: 300, message: 'Biography description is too long'}]
                  })(< TextArea rows={2} />)
              }
              </Form.Item>
              <Button className="center-button" type='primary'
                      htmlType='submit'>Save changes</Button>
          </Form>
      </div>
    );
  }
}
export default Form.create()(EditProfileUserInfo);