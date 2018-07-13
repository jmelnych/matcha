import React, { Component } from 'react'
import {connect} from 'react-redux'


class ProfileFeedPosts extends Component {
    componentDidMount(){
        //this.props.getPosts(); TODO: doesn't exist yet
    }

render() {
    let posts = this.props.posts;
    let src;
    console.log(posts);
    return (
      <div>
          {posts.map((post) =>
              <div key={post.id} className="profile-feed-snippet">
                  <div className="feed-snippet-head">
                      <p className="hidden">{src = require(`../img/avatars/${post.avatar}`)}</p>
                      <img src={src} alt="author-avatar" className="feed-snippet-head-avatar"/>
                      <p>{post.author}</p>
                      <p>{post.date}</p>
                  </div>
                  {post.text}
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
export default connect(mapStateToProps)(ProfileFeedPosts);