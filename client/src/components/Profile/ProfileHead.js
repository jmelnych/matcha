import React, { Component } from 'react'
import Ionicon from 'react-ionicons'
import {Modal} from 'antd'
import PropTypes from 'prop-types'
import EditProfileUserTabs from './EditProfile/EditProfileUserTabs'
import EditProfileUserAvatar from './EditProfile/EditProfileUserAvatar'
import {connect} from 'react-redux'
import ProfileUserGenderIcon from '../UI/ProfileUserGenderIcon'


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

        const editablePen = {
            bottom: '15px',
            right: '10px',
            fill:'#5caef9',
            width: '35px',
            height: '35px'
        };
    const { visible, confirmLoading, ModalText } = this.state;
    const {user} = this.props;
    return (
          <div className="profile-main-header">
              <div className="profile-main-avatar">
                  <div className="wrapper">
                  <EditProfileUserAvatar/>
                  <figcaption>
                      <p className="figcaption-text">Rating: {user.rating}</p>
                      <p className="figcaption-text">Age: {user.age}</p>
                      <p className="figcaption-text">City: {user.location.city}</p>
                      <p className="figcaption-text">Gender:
                      <ProfileUserGenderIcon user={this.props.user.gender}/></p>
                  </figcaption>
                      <Ionicon onClick={this.showModal} className="editable-icon" style={editablePen} icon="md-create"/>
                    </div>
              </div>
              <Modal title="Edit your profile info"
                     visible={visible}
                     onCancel={this.handleCancel}
                     confirmLoading={confirmLoading}
                     footer={null}>
                  {ModalText ? <p>{ModalText}</p> :
                      <EditProfileUserTabs closeOnSubmit={this.handleOk}/>
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