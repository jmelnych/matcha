import React, { Component } from 'react'
import {getUsers} from '../actions/searchActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Filter from './Filter'

class Search extends Component {

    componentDidMount() {
        this.props.getUsers();
    };

render() {
    let users = this.props.users;
    let src;
    //TODO: filter current user id, maybe in reducer?

    return (
      <div className="container-flex top">
          <Filter/>
          <div className="container-results">
          { users.map((user) =>
          <figure key={user.id} className="user-snippet">
              <p>{src = require(`../img/avatars/${user.avatar}`)}</p>
              <img src={src}
                   alt="profile-sample" className="background"/>
              <img src={src}
                   alt="profile-sample" className="profile"/>
              <figcaption>
                  <h3>{user.username}
                          <span>{user.occupancy}</span></h3>
                  <div className="icons">

                  </div>
              </figcaption>
          </figure>
          )} {users.length === 0 &&
          <h3> No users with such parameters found.</h3>
          }
          </div>

      </div>
    );
  }
};

function mapStateToProps({users}) {
    return {
        users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => dispatch(getUsers())
    }

};

Search.propTypes = {
    getUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);