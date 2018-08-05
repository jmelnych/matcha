import React, { Component } from 'react'
import {Input} from 'antd'
import {connect} from 'react-redux'
import {populateUserList} from '../../actions/chatActions'
import PropTypes from 'prop-types'

const Search = Input.Search;

class MessengerPeople extends Component {
render() {
    return (
        <div className="people-list-container">
            <Search
                placeholder="search   "
                onSearch={value => console.log(value)}
                style={{ width: '90%' }}/>
            <ul className="people-list">
                <li className="people-list-person">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                    <div className="people-list-person-about">
                        <div className="people-list-person-name">Vincent Porter</div>
                        <div className="people-list-person-status">
                            <span className="circle online">&#9679;</span> online
                        </div>
                    </div>
                </li>

                <li className="people-list-person">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                    <div className="people-list-person-about">
                        <div className="people-list-person-name">Vincent Porter</div>
                        <div className="people-list-person-status">
                            <span className="circle online">&#9679;</span> online
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
  }
};

MessengerPeople.propTypes = {
    populateUserList: PropTypes.func.isRequired //TODO: get all 'match users' and display it
};

export default connect(null, {populateUserList})(MessengerPeople);