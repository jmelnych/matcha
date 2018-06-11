import React, { Component } from 'react'
import { Form, Input, Radio, Button } from 'antd'

class Signup extends Component {
	state = {
		email: '',
		username: '',
		firstname: '',
		lastname: '',
		gender: '',
		password: '',
		repeat_password: ''
	}

	onChange = (e) => {
		console.log(e.target.name);
		//let field = e.target.name;
		//let value = e.target.value;
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	onSubmit = () => {
		console.log(this.state);
	}

	render() {
		return (
			<div>
				<h1>Signup</h1>
				<Form>
				{/*<Form.Item label='email'> {
					getFieldDecorator('email', {
						rules: [{
							required: true, message: 'Please input your E-mail!',
						}, {
							validator: this.checkEmailFormat
						}]
					}) (
						<Input name='email' placeholder='Email'
						onChange={e => this.onChange(e)} value={this.state.email}/>

					)}
				</Form.Item> */}
				<Input name='username' placeholder='Username'
				onChange={e => this.onChange(e)} value={this.state.username}/>
				<Input name='firstname' placeholder='Firstname'
				onChange={e => this.onChange(e)} value={this.state.firstname}/>
				<Input name='lastname' placeholder='Lastname'
				onChange={e => this.onChange(e)} value={this.state.lastname}/>

				<Radio.Group name='gender' onChange={e => this.onChange(e)} value={this.state.gender}>
                  <Radio value='male'>Male</Radio>
                  <Radio value='female'>Female</Radio>
                </Radio.Group>
				<Input name='password' placeholder='Password' type='password'
				onChange={e => this.onChange(e)} />
				<Input name='repeat_password' placeholder='Repeat password' type='password'
				onChange={e => this.onChange(e)} />
				<Button onClick={() => this.onSubmit()}type='primary'>Sign up</Button>
				</Form>
			</div>
			)
	}
}

let FancyFormComponent = Form.create()(Signup);
export { FancyFormComponent as default}