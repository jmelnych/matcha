import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getPosts, deletePost} from '../../actions/postActions'
import Ionicon from 'react-ionicons'
import {Modal} from 'antd'
import EditProfileFeedPost from './EditProfile/EditProfileFeedPost'
import orderBy from 'lodash/orderBy'
import PropTypes from 'prop-types'

class ProfileFeedPosts extends Component {
    state = {
        visible: false,
        confirmLoading: true,
        ModalText: '',
        post: null
    };
    componentDidMount(){
        this.props.getPosts();
    };

    showModal = (post) => {
        this.setState({
            visible: true,
            post
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            post: null
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
                ModalText: '',
                post: null
            });
        }, 1000);
    };
    showDeleteConfirm = (postId) => {
        const confirmDelete = this.props.deletePost;
        Modal.confirm({
            title: 'Are you sure you want delete this post?',
            content: 'This action is not reversible',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                confirmDelete(postId);
            },
            onCancel() {
                console.log('Thanks for saving me from being deleted');
            },
        });
    };

render() {
    const { visible, confirmLoading, ModalText } = this.state;
    let posts = this.props.posts;
    posts = orderBy(posts, ['added'], ['desc']);
    return (
      <div>
          {posts.map((post) =>
              <div key={post.id} className="profile-feed-snippet">
                  <div className="feed-snippet-head">
                      <p>{post.added}</p>
                  </div>
                  <h4 className="feed-snippet-title">
                      {post.title}
                  </h4>
                  <p className="feed-snippet-text">
                  {post.post}
                  </p>
                  <div className="editable feed-snippet-footer">
                      <Ionicon onClick={() => this.showModal(post)} className="editable-icon" icon="md-create"/>
                    <Ionicon onClick={() => this.showDeleteConfirm(post.id)} className="editable-icon" icon="ios-trash"/>
                  </div>
                  <Modal title="Edit your post"
                         visible={visible}
                         onCancel={this.handleCancel}
                         destroyOnClose={true}
                         confirmLoading={confirmLoading}
                         footer={null}>
                      {ModalText ? <p>{ModalText}</p> :
                          <EditProfileFeedPost currentPost={this.state.post} closeOnSubmit={this.handleOk}/>
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

ProfileFeedPosts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    posts: PropTypes.array
}
export default connect(mapStateToProps, {getPosts, deletePost})(ProfileFeedPosts);