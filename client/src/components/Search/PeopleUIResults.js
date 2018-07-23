import React from 'react'

const PeopleUIResults = (props) => {
    let users = props.users;
    let src;
    return (
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
    )
};

export default PeopleUIResults;