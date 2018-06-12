import React, { Component } from 'react'
import { Form, Input, Radio, Button } from 'antd'
import { Layout} from 'antd'


const { Header, Content } = Layout;

class Signup extends Component {
	state = {
		email: '',
		username: '',
		firstname: '',
		lastname: '',
		gender: '',
		password: '',
		confirm_password: '',
		conf_value: false
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
		     if (!err) {
		        console.log('Received values of form: ', values);
		      }
		    });
		console.log(this.state);
	}

	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
	    if (value && this.state.conf_value) {
	      form.validateFields(['confirm_password'], { force: true });
	    }
	    callback();
	 }

	 handleBlur = (e) => {
	 	const value = e.target.value;
	 	this.setState({ conf_value: this.state.conf_value || !!value});
	 }

	 compareToFirstPassword = (rule, value, callback) => {
	 	const form = this.props.form;
		    if (value && value !== form.getFieldValue('password')) {
		      callback('Two passwords that you enter is inconsistent');
		    } else {
		      callback();
		    }
	 }

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 8 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 16 },
	      },
	    };
		return (
			<div>
				<Header className="App-header"><h1>Signup</h1></Header>
				<Content className="App-content">
				<Form className="App-form" onSubmit={this.onSubmit}>
				<Form.Item {...formItemLayout} label='E-mail'> {
					getFieldDecorator('email', {
						rules: [{
							type: 'email',
							message: 'e-mail is not valid',
						},
						{
							required: true,
							message: 'Please input your E-mail'
						}]
					})(<Input name='email'
					onChange={e => this.onChange(e)}/>)
				}
				</Form.Item>
				<Form.Item {...formItemLayout} label='Username'> {
					getFieldDecorator('username', {
						rules: [{
							required: true,
							message: 'Please input your Username'
						}]
					})(<Input name='username'
						onChange={e => this.onChange(e)}/>)
				}
				</Form.Item>
				<Form.Item {...formItemLayout} label='First name'> {
					getFieldDecorator('firstname', {
						rules: [{
							required: true,
							message: 'Please input your first name'
						}]
					})(<Input name='firstname'
						onChange={e => this.onChange(e)}/>)
				}
				</Form.Item>
				<Form.Item {...formItemLayout} label='Last name'> {
					getFieldDecorator('lastname', {
						rules: [{
							required: true,
							message: 'Please input your last name'
						}]
					})(<Input name='lastname'
						onChange={e => this.onChange(e)}/>)
				}
				</Form.Item>
				<Form.Item {...formItemLayout} label='Gender'> {
					getFieldDecorator('gender', {
						rules: [{
							required: true,
							message: 'Please select your gender'
						}]
					})(<Radio.Group name='gender' onChange={e => this.onChange(e)}>
		                  <Radio value='male'>Male</Radio>
		                  <Radio value='female'>Female</Radio>
		                </Radio.Group>)
				}
				</Form.Item>
				<Form.Item {...formItemLayout} label='Password'> {
					getFieldDecorator('password', {
						rules: [{
				              required: true,
				              message: 'Please input your password',
				            }, {
				              validator: this.validateToNextPassword,
				            }],
					})(<Input name='password' type='password'
						onChange={e => this.onChange(e)} />)
				}
				</Form.Item>
				<Form.Item {...formItemLayout} label="Confirm Password">{
					getFieldDecorator('confirm_password', {
			            rules: [{
			              required: true, message: 'Please confirm your password',
			            }, {
			              validator: this.compareToFirstPassword,
			            }],
			          })(<Input name='confirm_password' type='password'
			          	onBlur={this.handleBlur}
						onChange={e => this.onChange(e)} />
			          )}
			        </Form.Item>

				<Button className="App-button" type='primary' htmlType='submit'>Sign up</Button>
				</Form>
				</Content>
			</div>
			)
	}
}

export default Form.create()(Signup);