import React, { Component } from 'react'
import {getUsersFiltered} from '../../actions/searchActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Filter from './Filter'

class Search extends Component {
render() {
    let users = this.props.users;
    let src;
    //TODO: how current user is filtered out?
    return (
      <div className="container-flex top">
          <Filter/>
          <div className="container-right">
              <div className="container-results">
              { users.map((user) =>
              <figure key={user.id} className="user-snippet">
                  <p>{src = require(`../../img/avatars/${user.avatar}`)}</p>
                  <img src={src}
                       alt="profile-sample" className="background"/>
                  <img src={src}
                       alt="profile-sample" className="profile"/>
                  <figcaption>
                      <h3>{user.username}</h3>
                      <span>rating: {user.rating}</span>
                      <span>{user.age} years old</span>
                      <span className="distance">&asymp; {(user.distance).toFixed(2)} km away</span>
                      <div className="icons">
                      </div>
                  </figcaption>
              </figure>
              )} {users.length === 0 &&
              <h3> No users with such parameters found.</h3>
              }
              </div>
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
        getUsersFiltered: () => dispatch(getUsersFiltered())
    }

};

Search.propTypes = {
    getUsersFiltered: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);