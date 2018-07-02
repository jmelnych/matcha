import React, { Component } from 'react'
import {Form, Input, Button, Select} from 'antd'
import {updateUser} from '../actions/userActions'
import {connect} from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'

class EditProfileUserInfo extends Component {
    componentDidMount() {
        this.setInitialValues();
    }

    onSubmit = (e) => {
        const { form, closeOnSubmit, user, updateUser } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //console.log('Received values of form editing: ', values);
                closeOnSubmit();
                let newUserInfo = new Object();
                if (values.firstname !== user.firstname) {
                    newUserInfo.firstname = values.firstname;
                } if (values.lastname !== user.lastname){
                    newUserInfo.lastname = values.lastname;
                } if (values.preference !== user.preference) {
                    newUserInfo.preference = values.preference;
                } if (values.occupancy !== user.occupancy) {
                    newUserInfo.occupancy = values.occupancy;
                } if (values.bio !== user.bio) {
                    newUserInfo.bio = values.bio;
                }
                if(!isEmpty(newUserInfo)) {
                    updateUser(user.id, newUserInfo);
                } else {
                    console.log('nothing has been changes');
                }
            }
        })
    };

    setInitialValues = () => {
        const { form, user } = this.props;
        form.setFieldsValue({
            firstname: user.firstname,
            lastname: user.lastname,
            occupancy: user.occupancy,
            preference: user.preference,
            bio: user.bio

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
                  getFieldDecorator('preference')(
                  <Select >
                      <Select.Option value="male">Men</Select.Option>
                      <Select.Option value="female">Women</Select.Option>
                      <Select.Option value="both">Men and Women</Select.Option>
                  </Select>)
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

EditProfileUserInfo.propTypes = {
    updateUser: PropTypes.func.isRequired,
    closeOnSubmit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default connect(null, {updateUser})(Form.create()(EditProfileUserInfo));