import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getPosts} from '../actions/postActions'


class ProfileFeedPosts extends Component {
    componentDidMount(){
        this.props.getPosts();
    }

render() {
    let posts = this.props.posts;

    console.log(posts);
    return (
      <div>
          {posts.map((post) =>
              <div key={post.id} className="profile-feed-snippet">
                  <div className="feed-snippet-head">
                      <p>{post.added}</p>
                  </div>
                  {post.post}
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