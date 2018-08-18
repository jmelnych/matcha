import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getMatchUsers} from '../../actions/searchActions'
import PropTypes from 'prop-types'
import UserList from "../UI/UserList";

class ProfileUserSuggestions extends Component {
    componentDidMount(){
        this.props.getMatchUsers();
    };
    render() {
        const {matches} = this.props;
        return (
            <div className="profile-main-info-list">
                <h3>Suggestions</h3>
                <UserList list={matches}/>
            </div>
        );
    }
}
function mapStateToProps({matches}) {
    return {matches}
}

ProfileUserSuggestions.propTypes = {
    getMatchUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {getMatchUsers})(ProfileUserSuggestions);