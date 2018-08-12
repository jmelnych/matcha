import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchHistory} from '../actions/historyActions'
import moment from 'moment'
import PropTypes from 'prop-types'
import UserAvatar from './Messenger/MessengerUI/ChatUserAvatar'

class Notifications extends Component {
    componentDidMount(){
        this.props.fetchHistory();
    }

    textForActivity = (action) => {
        switch (action) {
            case "I see":
                return "You have viewed this user";
            case "see Me":
                return "The user viewed your profile";
            case "I break up":
                return "You broke up with this user!";
            case "break up Me":
                return "The user has broken up with you :(";
            case "I like":
                return "You liked this user";
            case "like Me":
                return "The user liked you";
            case "I match" || "match":
                return "Congrats! You became a match with the user";
            case "I ban":
                return "You banned the user";
            case "ban Me":
                return "The user banned you";
            default:
                return "Something has happened between you and user";
        }
    };

render() {
        const {history} = this.props;
    return (
      <div className="container-center top">
          {history.map(activity => (
              <article key={activity.history_id} className="notification-plate">
                  <UserAvatar user={activity}/>
                  <div className="other-user">{`${activity.firstname}, ${activity.lastname}`}</div>
                  <div className="activity">{this.textForActivity(activity.action)}</div>
                  <div className="time">{moment(activity.added).fromNow()}</div>
              </article>
          ))}
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
    return{
        fetchHistory: () => dispatch(fetchHistory())
    }
};

function mapStateToProps({history}) {
    return {history};
}

Notifications.propTypes = {
    fetchHistory: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);