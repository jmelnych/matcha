import React, { Component } from 'react'
import { Input, Button } from 'antd'
const { TextArea } = Input

class ProfileUserPost extends Component {
render() {
    return (
        <div className="profile-post-area">
            <TextArea className="post-textarea" placeholder="What's on your mind?" rows={3} />
            <Button className="post-button" size="large" type="primary" htmlType="submit">Post</Button>
        </div>
    );
  }
}
export default ProfileUserPost;