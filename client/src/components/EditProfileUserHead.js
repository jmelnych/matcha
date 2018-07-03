import React, { Component } from 'react'
import {updateUser} from '../actions/userActions'
import {connect} from 'react-redux'
import {Form, Input, Button, Radio} from 'antd'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'


class EditProfileUserHead extends Component {
    componentDidMount() {
        this.setInitialValues();
    }

    setInitialValues = () => {
        const { form, user } = this.props;
        form.setFieldsValue({
            username: user.username,
            gender: user.gender,
        });
    };

    onSubmit = (e) => {
        const { form, closeOnSubmit, user, updateUser } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //console.log('Received values of form editing: ', values);
                closeOnSubmit();
                let newUserInfo = new Object();
                if (values.username !== user.username) {
                    newUserInfo.username = values.username;
                } if (values.gender !== user.gender){
                    newUserInfo.gender = values.gender;
                }
                if(!isEmpty(newUserInfo)) {
                    updateUser(user.id, newUserInfo);
                } else {
                    console.log('nothing has been changes');
                }
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

    return (
      <div>
          <Form onSubmit={this.onSubmit}>
              <Form.Item {...formItemLayout} label='Username'> {
                  getFieldDecorator('username', {
                      rules: [{required: true, message: 'Please input your username'},
                          {min: 2, message:'Username name is too short'}]
                  })(<Input  name='username'/>)
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
              <Button className="center-button" type='primary'
                      htmlType='submit'>Save changes</Button>
          </Form>
      </div>
    );
  }
};

EditProfileUserHead.propTypes = {
    updateUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    closeOnSubmit: PropTypes.func.isRequired
};

export default connect(null, {updateUser})(Form.create()(EditProfileUserHead));