import React, { Component } from 'react'
import {likeUser} from '../../actions/userActions'
import {connect} from 'react-redux'
import {Button, Popconfirm} from 'antd'

class LikeButtonStatus extends Component {
    state = {
        buttonClass: '',
        buttonText: ''
    };

    // componentDidMount() {
    //     const likeStatus;
    //     if (this.props.history){
    //         likeStatus = this.props.history[0];
    //     }
    //     if (likeStatus === 'I like') {
    //         this.setState({
    //             buttonClass: 'i-liked-button'
    //         })
    //     }
    //     let buttonClass;
    //     let buttonText;
    // };

    // history - can be one of
    // ('I like', 'like Me', 'match',
    // 'I ban', 'ban Me')

    like = () => {
        const {id} = this.props.info;
        this.props.likeUser(id);
    };
render() {

    return (
        <Button className={"like-button " + (this.props.info ? 'match-button' : 'i-liked-button')}
                onClick={this.like} icon="heart">Like</Button>
    );
  }
}
function mapStateToProps({otherUser}){
    return otherUser.user;
};

function mapDispatchToProps(dispatch) {
    return {
        likeUser: (id) => dispatch(likeUser(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeButtonStatus);