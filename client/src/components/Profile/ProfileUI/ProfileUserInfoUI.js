import React from 'react'
import Ionicon from 'react-ionicons'
import moment from 'moment'
import PropTypes from 'prop-types'

const ProfileUserInfoUI = (props) => {
    const ionicStyle = {
        fill: '#001529',
        marginBottom: '-5px',
        marginRight: '10px',
    };
    const user = props.user;
    const ouIndicator = props.ouIndicator;
    return (
        <div>
            <li><Ionicon icon="ios-contact-outline" style={ionicStyle}/>
                <span className="text-secondary">Full Name: </span>
                <span className={ouIndicator ? "non-editable" : "editable"}>{user.firstname} {user.lastname}</span></li>

            {(user.occupancy) &&<li><Ionicon icon="ios-briefcase-outline" style={ionicStyle}/>
                <span className="text-secondary">Occupancy: </span>
                <span className={ouIndicator ? "non-editable" : "editable"}>{user.occupancy}</span></li>
            }
            <li><Ionicon icon="ios-heart-outline" style={ionicStyle}/>
                <span className="text-secondary">Preferences: </span>
                <span className={ouIndicator ? "non-editable" : "editable"}>{user.preference === 'both' ? 'Men and Women':
                    user.preference.charAt(0).toUpperCase() + user.preference.substr(1)}</span></li>
            {(user.personality) &&<li><Ionicon icon="ios-body-outline" style={ionicStyle}/>
                <span className="text-secondary">Personality type: </span>
                <span className={ouIndicator ? "non-editable" : "editable"}>{user.personality}</span></li>
            }
            <li><Ionicon icon="ios-wine-outline" style={ionicStyle}/>
                <span className="text-secondary">Birthday: </span>
                <span className={ouIndicator ? "non-editable" : "editable"}> {moment(new Date(user.bday), 'MM/DD/YYYY').format('ll')}</span>
            </li>
            <li><Ionicon icon="ios-time-outline" style={ionicStyle}/>
                <span className="text-secondary">Joined: </span>
                <span className="non-editable"> {moment (new Date(user.added)).format('ll')}</span>
            </li>
            {(user.bio) &&<li><Ionicon icon="ios-book-outline" style={ionicStyle}/>
                <span className="text-secondary">Bio: </span>
                <span className={ouIndicator ? "non-editable" : "editable"}> {user.bio}</span></li>
            }
        </div>
    );
};

ProfileUserInfoUI.propTypes = {
    user: PropTypes.object.isRequired,
    ouIndicator: PropTypes.bool
}

export default ProfileUserInfoUI;