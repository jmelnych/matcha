import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchHistory} from '../actions/historyActions'
import PropTypes from 'prop-types'

class Notifications extends Component {
    componentDidMount(){
        this.props.fetchHistory();
    }
render() {
    return (
      <div className="container-flex-center top">
          <div className="notification-plate">
          </div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
    return{
        fetchHistory: () => dispatch(fetchHistory())
    }
}

Notifications.propTypes = {
    fetchHistory: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Notifications);