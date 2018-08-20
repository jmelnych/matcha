import React from 'react'
import {Link} from 'react-router-dom'
import UserStat from './UserStatus'
import PropTypes from 'prop-types'
import {getBaseURL} from '../../config';

const PeopleListResults = (props) => {
    const users = props.users;
    return (
        <div className="container-results">
            {users.map((user) =>
                <Link key={user.id} to={`/user/${user.id}`}>
                    <figure className="user-snippet">
                        <img src={`${getBaseURL()}/avatars/${user.avatar}`}
                             alt="profile-sample" className="background"/>
                        <img src={`${getBaseURL()}/avatars/${user.avatar}`}
                             alt="profile-sample" className="profile"/>
                        <figcaption>
                            <UserStat status={user.online}/>
                            <h3>{user.firstname} {user.lastname}</h3>
                            <span>rating: {user.rating}</span>
                            <span>{user.age} years old</span>
                            <span className="distance">&asymp; {(user.distance).toFixed(2)} km away</span>
                            <div className="icons">
                            </div>
                        </figcaption>
                    </figure>
                </Link>
            )} {users.length === 0 &&
        <h3> No users with such parameters found.</h3>
        }
        </div>
    )
};

PeopleListResults.propTypes = {
    users: PropTypes.array.isRequired
}

export default PeopleListResults;