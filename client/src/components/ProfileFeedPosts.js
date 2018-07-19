import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getPosts} from '../actions/postActions'
import Ionicon from 'react-ionicons'


class ProfileFeedPosts extends Component {
    componentDidMount(){
        this.props.getPosts();
    }

render() {
    let posts = this.props.posts;
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
                      <Ionicon  className="editable-icon" icon="md-create"/>
                    <Ionicon className="editable-icon" icon="ios-trash"/>
                  </div>
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