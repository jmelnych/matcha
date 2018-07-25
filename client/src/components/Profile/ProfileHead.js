import React, { Component } from 'react'
import Ionicon from 'react-ionicons'
import {Popover, Modal} from 'antd'
import PropTypes from 'prop-types'
import EditProfileUserHead from './EditProfile/EditProfileUserHead'
import EditProfileUserAvatar from './EditProfile/EditProfileUserAvatar'
import {connect} from 'react-redux'
import ProfileUserGenderIcon from './ProfileUI/ProfileUserGenderIcon'

class ProfileHead extends Component {
    state = {
        visible: false,
        confirmLoading: true,
        ModalText: ''
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
            ModalText: 'Updating your information... Please, wait',
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
    const content = (
        <div>
            <p>Rating is count based on your profile</p>
            <p>completness and likes from other users</p>
        </div>
    );
        const editablePen = {
            bottom: '15px',
            right: '0',
            fill:'#5caef9',
            width: '35px',
            height: '35px'
        };
    const { visible, confirmLoading, ModalText } = this.state;
    const {user} = this.props;
    return (
          <div className="profile-main-header">
              <div className="profile-main-avatar">
                  <EditProfileUserAvatar/>
              </div>
              <figcaption>
                  <h2>{user.username}
                      <ProfileUserGenderIcon gender={user.gender}/>
                      <Ionicon onClick={this.showModal} className="editable-icon" style={editablePen} icon="md-create"/>
                  </h2>
                  <Ionicon icon="ios-pulse-outline" color='white' fontSize="45px"/>
                  <Popover placement="rightTop" title="Rating info" content={content}
                           trigger="hover"><p className="rating-text">Rating: {user.rating}</p></Popover>
              </figcaption>
              <Modal title="Edit your profile info"
                     visible={visible}
                     onCancel={this.handleCancel}
                     confirmLoading={confirmLoading}
                     footer={null}>
                  {ModalText ? <p>{ModalText}</p> :
                      <EditProfileUserHead closeOnSubmit={this.handleOk}/>
                  }
              </Modal>
          </div>

    );
  }
}

ProfileHead.propTypes = {
    user: PropTypes.object.isRequired
};

function mapStateToProps({user}){
    return user;
}


export default connect(mapStateToProps)(ProfileHead);