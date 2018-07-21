import React, { Component } from 'react'
import Ionicon from 'react-ionicons'
import {saveLocation} from '../../actions/userActions'
import {connect} from 'react-redux'

class ProfileUserLocation extends Component {
    state = {
        lat: null,
        lng: null,
        city: '',
        country: ''
    };
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({x: position.coords.latitude,
                            y: position.coords.longitude});
            this.codeLatLng(position.coords.latitude, position.coords.longitude);
        });
    };

    codeLatLng = (lat, lng) => {
        const geocoder = new google.maps.Geocoder();
        const latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                console.log('results', results);
                if (results[1] && results[1].address_components) {

                    const addressComponents = results[1].address_components;
                    let city = '';
                    let country = '';
                    addressComponents.map(compo => {
                        if (compo.types){
                            compo.types.map(type => {
                                if (type === 'administrative_area_level_1'){
                                    city = compo.long_name;
                                }
                                if (type === 'country') {
                                    country = compo.long_name;
                                }
                            })
                        }
                    });
                    this.setState({
                        city,
                        country
                    });
                    let locationObj = {
                        lat,
                        lng,
                        city,
                        country
                    };
                    this.props.saveLocation(locationObj);
                } else {
                    console.log("No results found");
                }
            } else {
                console.log("Geocoder failed due to: " + status);
            }
        }.bind(this));
    };
    render() {
        const ionicStyle = {
            fill: '#001529',
            marginBottom: '-5px',
            marginRight: '10px',
        };
        const {city, country} = this.state;
        const dbLocation = this.props.userLocation;
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