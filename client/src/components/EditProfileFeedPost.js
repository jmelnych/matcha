import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'
import {Form, Input, Button} from 'antd'
import {updatePost} from '../actions/postActions'
import {connect} from 'react-redux'

class EditProfileFeedPost extends Component {
    componentDidMount() {
        this.setInitialValues();
    };

    setInitialValues = () => {
        const { form, currentPost } = this.props;
        form.setFieldsValue({
            title: currentPost.title,
            text: currentPost.post
        });
    };

    onSubmit = (e) => {
        const { form, closeOnSubmit, currentPost } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //console.log('Received values of form editing: ', values);
                let updatedPost = new Object();
                updatedPost.id = currentPost.id;
                if (values.title !== currentPost.title) {
                    updatedPost.title = values.title;
                } if (values.text !== currentPost.text){
                    updatedPost.post = values.text;
                }
                if(!isEmpty(updatedPost)) {
                    this.props.updatePost(updatedPost);
                } else {
                    console.log('nothing has been changes');
                }
                closeOnSubmit();
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
    const { TextArea } = Input;
    return (
      <div>
          <Form onSubmit={this.onSubmit}>
          <Form.Item {...formItemLayout} label='Title'> {
              getFieldDecorator('title', {
                  validateTrigger: 'onBlur',
                  rules: [{max: 300, message: 'Title is too long'}]
              })(< TextArea rows={1} />)
          }
          </Form.Item>
          <Form.Item {...formItemLayout} label='Text'> {
              getFieldDecorator('text', {
                  validateTrigger: 'onBlur',
                  rules: [{max: 1300, message: 'Text is too long'}]
              })(< TextArea rows={5} />)
          }
          </Form.Item>
          <Button className="center-button" type='primary'
                  htmlType='submit'>Save changes</Button>
          </Form>
      </div>
    );
  }
}
export default connect(null, {updatePost})(Form.create()(EditProfileFeedPost));