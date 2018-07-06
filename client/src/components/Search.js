import React, { Component } from 'react'
import {getUsers, getUserByGender} from '../actions/searchActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Checkbox } from 'antd'

const plainOptions = ['Men', 'Women'];

class Search extends Component {
    state = {
        checked: ['Men', 'Women']
    }
    componentDidMount() {
        this.props.getUsers();
    };

    onChange = (checked) => {
        console.log(checked);
        this.setState({
            checked
        });

        //TODO: request based on gender
        if (checked.length === 2 ){
            console.log('requesting all');
            this.props.getUsers();
        } else if (checked[0] === 'Men') {
            this.props.getUserByGender({gender: 'male'});
        } else if (checked[0] === 'Women') {
            this.props.getUserByGender({gender: 'female'});
        } else {
            this.props.getUsers(/* no one */);
        }
    };

render() {
    let users = this.props.users;
    let src;
    //TODO: filter current user id, maybe in reducer
    //
    const CheckboxGroup = Checkbox.Group;
    return (
      <div className="container-flex">
          <div className="container-nav">
              <h3>Filter results</h3>
              <CheckboxGroup options={plainOptions} value={this.state.checked} onChange={this.onChange} />
          </div>
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
        getUsers: () => dispatch(getUsers()),
        getUserByGender: (gender) => dispatch(getUserByGender(gender))
    }

};

Search.propTypes = {
    getUsers: PropTypes.func.isRequired,
    getUserByGender: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);