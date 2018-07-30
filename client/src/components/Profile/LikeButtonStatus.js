import React, { Component } from 'react'
import {likeUser} from '../../actions/userActions'
import {connect} from 'react-redux'
import {Button, Popover} from 'antd'
import PropTypes from 'prop-types'

class LikeButtonStatus extends Component {
    state = {
        buttonClass: 'no-likes-button',
        popOverText: 'Like the profile? Like the user!',
        brokenHeart: false
    };

    componentDidMount() {
        // const likeStatus;
        // if (this.props.history){
        //     likeStatus = this.props.history[0];
        // }
        // if (likeStatus === 'I like') {
        //     this.setState({
        //         buttonClass: 'i-liked-button'
        //     })
        // }
        // let buttonClass;
        // let buttonText;
    };

    componentWillReceiveProps(props) {
        const relatStatus = props.history;
        let buttonClass, popOverText;
        if (relatStatus.includes('I like')) {
            buttonClass = 'i-liked-button';
            popOverText = 'You already liked this user. If he/she like you in return, you become a match. ' +
                'Wait for the response on remove your like.';
            this.setState ({
                buttonClass,
                popOverText
            })
            //console.log('continue');
        } else if (relatStatus.includes('like Me')) {
            buttonClass = 'me-liked-button';
            popOverText = 'The user liked you. If you like her/him, you can like in return and then you ' +
                'will become a match!';
            this.setState ({
                buttonClass,
                popOverText
            })
        } else if (relatStatus.includes('match')) {
            buttonClass = 'match-button';
            popOverText = 'You are a match! You can write direct messages to each other!';
            this.setState ({
                buttonClass,
                popOverText
            })
        } else if (relatStatus.includes('broken')) {
            buttonClass = 'broken-button';
            popOverText = 'Woo, you have broken up with the user. You can like him/her again.';
            this.setState ({
                buttonClass,
                popOverText,
                brokenHeart: true
            })
        }

        if (relatStatus.includes('I ban')) {

        }
    };

    // history - can be one of
    // ('I like', 'like Me', 'match',
    // 'I ban', 'ban Me')

    like = () => {
        const {id} = this.props.info;
        this.props.likeUser(id);

    };
render() {
    return (
        <Popover className="pop-relationship" placement="top" title="Your relationship status" content={this.state.popOverText}
                 trigger="hover">
        <Button className={`like-button ${this.state.buttonClass}`}
                onClick={this.like} icon={this.state.brokenHeart ? "" : "heart"}/>
        </Popover>
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
};

LikeButtonStatus.propTypes = {
    otherUser: PropTypes.object,
    likeUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButtonStatus);