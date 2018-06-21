import React, {Component} from 'react'
import {Form, Input, Button} from 'antd'
import {Layout} from 'antd'
import Tabs from './Tabs'



const {Content} = Layout;

class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        console.log(this.state);
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
                <Content className="App-content">
                    <Tabs/>
                    <Form className="App-form" onSubmit={this.onSubmit}>
                        <Form.Item {...formItemLayout} label='E-mail'> {
                            getFieldDecorator('email', {
                                rules: [{
                                    type: 'email',
                                    message: 'e-mail is not valid'
                                },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail'
                                    }]
                            })(<Input name='email'
                                      onChange={e => this.onChange(e)}/>)
                        }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='Password'> {
                            getFieldDecorator('password', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your password'
                                }]
                            })(<Input name='password' type='password'
                                      onChange={e => this.onChange(e)}/>)
                        }
                        </Form.Item>
                        <Button className="App-button" type='primary' htmlType='submit'>Login</Button>
                    </Form>
                </Content>
            </div>
        )
    }
}

export default Form.create()(Login);