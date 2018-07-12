import React, { Component } from 'react'
import {Tabs} from 'antd'
import EditProfileUserInfo from './EditProfileUserInfo'
import EditProfileUserHead from './EditProfileUserHead'
import EditProfileUserPassword from './EditProfileUserPassword'

const TabPane = Tabs.TabPane;
class EditProfileUserTabs extends Component {
render() {
    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Profile info" key="1"><EditProfileUserInfo
                closeOnSubmit={this.props.closeOnSubmit}/></TabPane>
            <TabPane tab="Main details" key="2"><EditProfileUserHead
                closeOnSubmit={this.props.closeOnSubmit}/></TabPane>
            <TabPane tab="Password settings" key="3"><EditProfileUserPassword
                closeOnSubmit={this.props.closeOnSubmit}/></TabPane>
        </Tabs>
    );
  }
}
export default EditProfileUserTabs;