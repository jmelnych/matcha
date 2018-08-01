import React, { Component } from 'react'
import {Popconfirm, message} from 'antd'
import {connect} from 'react-redux'
import ProfileUserGenderIcon from './ProfileUI/ProfileUserGenderIcon'
import LikeButtonStatus from './LikeButtonStatus'
import {fakeNotification, banUser} from '../../actions/userActions'
import PropTypes from 'prop-types'

class OtherUserProfileHead extends Component {
    state = {
        iDidBan: false,
        banMe: false
    };

    reportFake = () => {
        const {id} = this.props.info;
        this.props.fakeNotification(id);
        message.success('Your notification has been send');
    };
    cancel = () => {
        console.log('cancel');
    };

    switchBan = () => {
        const {id} = this.props.info;
        this.props.banUser(id);
        this.setState({
            iDidBan: !this.state.iDidBan
        })
    };

    componentWillReceiveProps(props){
        const relatStatus = props.history;
        if (relatStatus.includes('I ban')) {
            this.setState({
                iDidBan: true
            })
        }
        if (relatStatus.includes('ban Me')) {
            this.setState({
                banMe: true
            })
        }
    }
render() {
        console.log('state ban in parent', this.state.iDidBan);
    const user = this.props.info ||
        {avatar: 'default.png', gender: 'male', rating: 0, age: 18, location: {city:'Kiev', country: 'Ukraine'}};
    const av_name = user.avatar;
    const avatar = require(`../../img/avatars/${av_name}`);
    return (
        <div className="profile-main-header">
            <div className="profile-main-avatar">
                <div className="wrapper">
                    <Popconfirm title="Are you sure you want to report fake account?"
                                onConfirm={this.reportFake} onCancel={this.cancel} okText="Yes" cancelText="No">
                        <a className="text-secondary suspect">Suspect fake account?</a>
                    </Popconfirm>
                    <Popconfirm title="Are you sure?"
                                onConfirm={this.switchBan} onCancel={this.cancel} okText="Yes" cancelText="No">
                        <a className="text-secondary ban">{this.state.iDidBan ? 'Unban' : 'Ban'}</a>
                    </Popconfirm>
                    <div className="profile-main-avatar-content">
                        <img src={avatar} alt="avatar"/>
                    </div>
                    <figcaption>
                        <p className="figcaption-text">Rating: {user.rating}</p>
                        <p className="figcaption-text">Age: {user.age}</p>
                        <p className="figcaption-text">City: {user.location.city}</p>
                        <p className="figcaption-text">Gender:
                            <ProfileUserGenderIcon user={user.gender}/></p>
                    </figcaption>
                    <LikeButtonStatus ban={this.state.iDidBan} banMe={this.state.banMe}/>
                </div>
            </div>
        </div>
    );
  }
}

function mapStateToProps({otherUser}){
    return otherUser.user;
};

function mapDispatchToProps(dispatch) {
    return {
        fakeNotification: (id) => dispatch(fakeNotification(id)),
        banUser: (id) => dispatch(banUser(id))
    }
};

OtherUserProfileHead.propTypes = {
    fakeNotification: PropTypes.func.isRequired,
    banUser: PropTypes.func.isRequired,
    otherUser: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherUserProfileHead);