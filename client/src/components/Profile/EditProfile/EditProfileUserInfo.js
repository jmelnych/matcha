import React, { Component } from 'react'
import {Form, Input, Button, Select, DatePicker, Popover} from 'antd'
import {updateUser} from '../../../actions/userActions'
import {connect} from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import moment from 'moment'

const dateFormat = 'MM/DD/YYYY';


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
                let newUserInfo = new Object();
                if (values.firstname !== user.firstname) {
                    newUserInfo.firstname = values.firstname;
                } if (values.lastname !== user.lastname){
                    newUserInfo.lastname = values.lastname;
                } if (values.preference !== user.preference) {
                    newUserInfo.preference = values.preference;
                } if (values.personality !== user.personality) {
                    newUserInfo.personality = values.personality;
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
                closeOnSubmit();
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
            personality: user.personality,
            bday: moment(user.bday, dateFormat),
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
    const content = (
        <div>
            <p>Don't know your personality type?</p>
            <p><a href="https://www.16personalities.com/free-personality-test" target="_blank">Take a test</a></p>
        </div>
    );

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
                      <Select.Option value="men">Men</Select.Option>
                      <Select.Option value="women">Women</Select.Option>
                      <Select.Option value="both">Men and Women</Select.Option>
                  </Select>)}
              </Form.Item>
              <Form.Item {...formItemLayout} label='Personality'> {
                  getFieldDecorator('personality')(
                      <Popover placement="rightTop" title="Personality type" content={content} trigger="hover">
                          <Select >
                          <Select.Option value="istj">ISTJ</Select.Option>
                          <Select.Option value="istp">ISTP</Select.Option>
                          <Select.Option value="isfj">ISFJ</Select.Option>
                          <Select.Option value="isfp">ISFP</Select.Option>
                          <Select.Option value="infj">INFJ</Select.Option>
                          <Select.Option value="infp">INFP</Select.Option>
                          <Select.Option value="intj">INTJ</Select.Option>
                          <Select.Option value="intp">INTP</Select.Option>
                          <Select.Option value="estp">ESTP</Select.Option>
                          <Select.Option value="estj">ESTJ</Select.Option>
                          <Select.Option value="esfp">ESFP</Select.Option>
                          <Select.Option value="esfj">ESFJ</Select.Option>
                          <Select.Option value="enfp">ENFP</Select.Option>
                          <Select.Option value="enfj">ENFJ</Select.Option>
                          <Select.Option value="entp">ENTP</Select.Option>
                          <Select.Option value="entj">ENTJ</Select.Option>
                      </Select>
                      </Popover>)}
              </Form.Item>
              <Form.Item {...formItemLayout} label='Birth day'> {
                  getFieldDecorator('bday',  {
                      rules:[{required: true, message: 'Please indicate your birth day'}]
                  })(
                      <DatePicker format={dateFormat} />
                  )
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

function mapStateToProps({user}){
    return user;
};

function dispatchMapStateToProps(dispatch) {
    return {
        updateUser: (id, newUserInfo) => dispatch(updateUser(id, newUserInfo))
    }
}

export default connect(mapStateToProps, dispatchMapStateToProps)(Form.create()(EditProfileUserInfo));