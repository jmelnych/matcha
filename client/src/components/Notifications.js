import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment'
import PropTypes from 'prop-types'
import PagePagination from './UI/PagePagination'
import UserAvatar from './UI/UserAvatar'
import {cleanHistoryNotes} from '../actions/historyActions'
import orderBy from 'lodash/orderBy'

class Notifications extends Component {
    componentDidMount(){
        this.props.cleanHistoryNotes();
    };

    state = {
        page: 1,
        rangeL: 0,
        rangeU: 8
    };

    handleChangePage = (page) => {
        let step = 8;
        let rangeL = (page - 1) * step;
        let rangeU = rangeL + step;
        this.setState({
            page,
            rangeL,
            rangeU
        });

    };

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
            case "I match":
            case "match Me":
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
    let history = this.props.history.all_history || [];
    history = orderBy(history, ['added'], ['desc']);
    const totalLength = history.length;
    history = history.slice(this.state.rangeL, this.state.rangeU);
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
          <PagePagination quantity={totalLength}
                          handleChangePage={this.handleChangePage}/>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
    return{
        cleanHistoryNotes: () => dispatch(cleanHistoryNotes())
    }
};

function mapStateToProps({history}) {
    return {history};
}

Notifications.propTypes = {
    cleanHistoryNotes: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);