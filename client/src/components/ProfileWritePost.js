import React, { Component } from 'react'
import { Input, Button, message } from 'antd'
import {addPost} from '../actions/postActions'
import {connect} from 'react-redux'

const { TextArea } = Input;

class ProfileWritePost extends Component {
    state = {
        title: '',
        post: ''
    };

    updateTitle = (title) => {
        this.setState({title})
    };

    updateText = (post) => {
        this.setState({post})
    };

    savePost = () => {
        let newPost = {
            title: this.state.title.trim(),
            post: this.state.post.trim()
        };
        if (newPost.post && newPost.title){
            this.props.addPost(newPost);
            this.setState({
                post: '',
                title: ''
            });
            message.success(`Post uploaded successfully`);
        } else {
            message.error(`Post fields title and body should be filled`);
        }
    };

render() {
    let postCount = this.props.posts.length;
    let allowTextArea = true;
    if (postCount >= 5) {
        allowTextArea = false;
    }
    return (<div>
        {(allowTextArea) &&
        <div className="profile-post-area">
            <div className="post-textarea">
                <TextArea className="transparent title" placeholder="Title"
                          rows={1} onChange={(e) => this.updateTitle(e.target.value)}
                value={this.state.title}/>
                <TextArea className="transparent" placeholder="What's on your mind?"
                          rows={1} onChange={(e) => this.updateText(e.target.value)}
                          value={this.state.post}/>
            </div>
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
