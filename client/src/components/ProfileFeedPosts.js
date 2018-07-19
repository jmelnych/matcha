import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getPosts} from '../actions/postActions'
import Ionicon from 'react-ionicons'
import {Modal} from 'antd'
import EditProfileFeedPost from './EditProfileFeedPost'


class ProfileFeedPosts extends Component {
    state = {
        visible: false,
        confirmLoading: true,
        ModalText: ''
    };
    componentDidMount(){
        this.props.getPosts();
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: 'Updating your post... Please, wait',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
                ModalText: ''
            });
        }, 1000);
    };

render() {
    const { visible, confirmLoading, ModalText } = this.state;
    const posts = this.props.posts;
    return (
      <div>
          {posts.map((post) =>
              <div key={post.id} className="profile-feed-snippet">
                  <div className="feed-snippet-head">
                      <p>{post.added}</p>
                  </div>
                  <h2 className="feed-snippet-title">
                      {post.title}
                  </h2>
                  <p className="feed-snippet-text">
                  {post.post}
                  </p>
                  <div className="editable feed-snippet-footer">
                      <Ionicon onClick={this.showModal} className="editable-icon" icon="md-create"/>
                    <Ionicon className="editable-icon" icon="ios-trash"/>
                  </div>
                  <Modal title="Edit your post"
                         visible={visible}
                         onCancel={this.handleCancel}
                         confirmLoading={confirmLoading}
                         footer={null}>
                      {ModalText ? <p>{ModalText}</p> :
                          <EditProfileFeedPost currentPost={post} closeOnSubmit={this.handleOk}/>
                      }
                  </Modal>
              </div>
          )}
      </div>
    );
  }
};

function mapStateToProps({posts}){
    return {
        posts
    }
};
export default connect(mapStateToProps, {getPosts})(ProfileFeedPosts);