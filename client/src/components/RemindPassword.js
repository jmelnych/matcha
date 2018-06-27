import React, { Component } from 'react'
import {addFlashMessage} from '../actions/flashMessages'
import {sendLinkPassword} from '../actions/userActions'
import {Form, Input, Button} from 'antd'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class RemindPassword extends Component {
    onSubmit = (e) => {
        e.preventDefault();
        const {form, sendLinkPassword, toggle, addFlashMessage} = this.props;
        form.validateFieldsAndScroll((err, values) => {
            console.log(values);
            if (!err) {
                sendLinkPassword(values);
                addFlashMessage({
                    type: 'success',
                    text: 'A link to restore your password has been send to your email'
                });
                toggle();
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
                <Button className="App-button" type='primary' htmlType='submit'>Send link for new password</Button>
            </Form>
        </div>
    );
  }
}

RemindPassword.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    sendLinkPassword: PropTypes.func.isRequired
}
export default connect(null, {addFlashMessage, sendLinkPassword}) (Form.create()(RemindPassword));