import React, { Component } from 'react'
import Ionicon from 'react-ionicons'
import {saveLocation} from '../../actions/userActions'
import {connect} from 'react-redux'
import {decodeLocation} from '../../api/decodeLocation'

class ProfileUserLocation extends Component {
    state = {
        lat: null,
        lng: null,
        city: '',
        country: ''
    };
    componentDidMount() {
        this.mounted = true;
        navigator.geolocation.getCurrentPosition((position) => {
            if(this.mounted) {
                this.setState({lat: position.coords.latitude,
                                lng: position.coords.longitude});
                let obj = (async () => {

                let locationObj = await decodeLocation(position.coords.latitude, position.coords.longitude);
                return locationObj;
                })();
                //TODO: get resolved obj from decodeLocation fnc and update user location on backend
                // if (locationObj) {
                //     this.setState({
                //         city: locationObj.city,
                //         country: locationObj.country
                //     });
                //     this.props.saveLocation({location: locationObj});
                // }
            }
        });
    };

    componentWillUnmount() {
        this.mounted = false;
    };

    render() {
        // console.log(this.state);
        const ionicStyle = {
            fill: '#001529',
            marginBottom: '-5px',
            marginRight: '10px',
        };
        const {city, country} = this.state;
        const dbLocationObj = this.props.userLocation;
        let dbLocation;
        if (dbLocationObj) {
            dbLocation = dbLocationObj.city + ', ' + dbLocationObj.country;
        }
        let userLocation = (city && country) ? `${city}, ${country}` : dbLocation;//don't wrap dbLocation into `` since it renders as `null` and sets to true
    return (
    <div>
        {(userLocation) && <li><Ionicon icon="ios-pin-outline" style={ionicStyle}/>
        <span className="text-secondary">Location: </span>
        <span className="editable">{userLocation}</span></li>
        }
    </div>
    );
  }
}
export default connect(null, {saveLocation})(ProfileUserLocation);
