import React, { Component } from 'react'
import Ionicon from 'react-ionicons'
import {saveLocation} from '../../actions/userActions'
import {connect} from 'react-redux'
import {decodeLocation} from '../../api/decodeLocation'

class ProfileUserLocation extends Component {

    componentDidMount() {
        this.mounted = true;
        navigator.geolocation.getCurrentPosition((position) => {
            if(this.mounted) {
                this.setState({lat: position.coords.latitude,
                                lng: position.coords.longitude});
                (async function () {
                let locationObj = await decodeLocation(position.coords.latitude, position.coords.longitude);
                    if (locationObj) {
                        this.props.saveLocation({location: locationObj});
                    }
                }).bind(this)();
            }
        });
    };

    componentWillUnmount() {
        this.mounted = false;
    };

    render() {
        const ionicStyle = {
            fill: '#001529',
            marginBottom: '-5px',
            marginRight: '10px',
        };
        let userLoc = `${this.props.user.location.city}, ${this.props.user.location.country}`;
    return (
    <div>
        {(userLoc) && <li><Ionicon icon="ios-pin-outline" style={ionicStyle}/>
        <span className="text-secondary">Location: </span>
        <span className="editable">{userLoc}</span></li>
        }
    </div>
    );
  }
};

function mapStateToProps({user}) {
    return user;
}

export default connect(mapStateToProps, {saveLocation})(ProfileUserLocation);
