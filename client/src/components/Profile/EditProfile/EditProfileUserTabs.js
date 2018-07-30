import React, { Component } from 'react'
import {Tabs} from 'antd'
import EditProfileUserInfo from './EditProfileUserInfo'
import EditProfileUserHead from './EditProfileUserHead'
import EditProfileUserPassword from './EditProfileUserPassword'
import EditProfileUserLocation from './EditProfileUserLocation'
import PropTypes from 'prop-types'

const TabPane = Tabs.TabPane;
class EditProfileUserTabs extends Component {
render() {
    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Profile info" key="1"><EditProfileUserInfo
                closeOnSubmit={this.props.closeOnSubmit}/></TabPane>
            <TabPane tab="Main details" key="2"><EditProfileUserHead
                closeOnSubmit={this.props.closeOnSubmit}/></TabPane>
            <TabPane tab="Location" key="3"><EditProfileUserLocation
                closeOnSubmit={this.props.closeOnSubmit}/></TabPane>
            <TabPane tab="Password settings" key="4"><EditProfileUserPassword
                closeOnSubmit={this.props.closeOnSubmit}/></TabPane>
        </Tabs>
    );
  }
};

EditProfileUserTabs.propTypes = {
    closeOnSubmit: PropTypes.func.isRequired
};

export default EditProfileUserTabs;