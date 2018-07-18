import React, { Component } from 'react'
import {Form, Input, Button, Select} from 'antd'
import {connect} from 'react-redux'
import {updateUser} from '../actions/userActions'
import PropTypes from 'prop-types'

class EditProfileUserLocation extends Component {
    componentDidMount() {
        this.setInitialValues();
    };

    setInitialValues = () => {
        const {form, user} = this.props;
        form.setFieldsValue({
            location: user.location

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
                if (values.location !== user.location) {
                    newUserInfo.location = values.location;
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
        <Form onSubmit={this.onSubmit}>
            <Form.Item {...formItemLayout} label='Location'> {
                getFieldDecorator('location', {
                    validateTrigger: 'onBlur'
                })(< Input name="location" />)
            }
            </Form.Item>
            <Button className="center-button" type='primary'
                    htmlType='submit'>Save changes</Button>
        </Form>
    );
  }
};

    EditProfileUserLocation.propTypes = {
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
    };
export default connect(mapStateToProps, dispatchMapStateToProps)(Form.create()(EditProfileUserLocation));







