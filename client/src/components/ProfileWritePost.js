import React, { Component } from 'react'
import { Input, Button, message } from 'antd'
import {addPost} from '../actions/postActions'
import {connect} from 'react-redux'

const { TextArea } = Input;

class ProfileWritePost extends Component {
    state = {
        text: ''
    };

    updateText = (text) => {
        this.setState({text})
    };

    savePost = () => {
        let newPost = {
            text: this.state.text.trim()
        };
        if (newPost.text){
            this.props.addPost(newPost);
            this.setState({
                text: ''
            });
            message.success(`Post uploaded successfully`);
        } else {
            message.error(`Post cannot be empty`);
        }
    };

render() {
    let postCount = this.props.posts.length;
    let allowTextArea = true;
    if (postCount >= 5) {
        allowTextArea = false;
    }
    return (<div>
        {(this.state.allowTextArea) &&
        <div className="profile-post-area">
            <TextArea className="post-textarea" placeholder="What's on your mind?"
                      rows={3} onChange={(e) => this.updateText(e.target.value)}
            value={this.state.text}/>
            <Button className="post-button" size="large" type="primary"
                    onClick={this.savePost} htmlType="submit">Post</Button>
        </div>}
        </div>
    );
  }
};

function mapStateToProps({posts}) {
    return {posts};
}

function mapDispatchToProps(dispatch) {
    return {
        addPost: (post) => dispatch(addPost(post))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileWritePost);