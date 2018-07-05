import React, { Component } from 'react'
import {getUsers} from '../actions/searchActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Search extends Component {
    componentDidMount() {
        this.props.getUsers();
    }
render() {
    return (
      <div className="container-flex">
          <figure className="user-snippet">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample1.jpg"
                   alt="profile-sample1" className="background"/>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample1.jpg"
                   alt="profile-sample1" className="profile"/>
              <figcaption>
                  <h3>Ursula Gurnmeister<span>Engineer</span></h3>
                  <div className="icons">

                  </div>
              </figcaption>
          </figure>

      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => dispatch(getUsers())
    }

};

Search.propTypes = {
    getUsers: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Search);