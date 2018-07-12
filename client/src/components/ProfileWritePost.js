import React, { Component } from 'react'
import { Input, Button } from 'antd'
import {addPost} from '../actions/postActions'
import {connect} from 'react-redux'

const { TextArea } = Input;

class ProfileWritePost extends Component {
    state = {
        text: ''
    };

    updateText = (text) => {
        this.setState({text: text.trim()})
    }

    savePost = () => {
        console.log('saving post');
        let newPost = {
            text: this.state.text
        }
        this.props.addPost(newPost);
    }
render() {
    return (
        <div className="profile-post-area">
            <TextArea className="post-textarea" placeholder="What's on your mind?"
                      rows={3} onChange={(e) => this.updateText(e.target.value)}
            value={this.state.text}/>
            <Button className="post-button" size="large" type="primary"
                    onClick={this.savePost} htmlType="submit">Post</Button>
        </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
    return {
        addPost: (post) => dispatch(addPost(post))
    }
}
export default connect(null, mapDispatchToProps)(ProfileWritePost);