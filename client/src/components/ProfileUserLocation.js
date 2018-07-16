import React, { Component } from 'react'
import Ionicon from 'react-ionicons'

class ProfileUserLocation extends Component {
    state = {
        x: null,
        y: null
    };
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude);
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
                    let city;
                    let country;
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
                    console.log('city', city);
                    console.log('country', country);
                } else {
                    console.log("No results found");
                }
            } else {
                console.log("Geocoder failed due to: " + status);
            }
        });
    };
    render() {
        const ionicStyle = {
            fill: '#001529',
            marginBottom: '-5px',
            marginRight: '10px',
        };
    return (
        <li><Ionicon icon="ios-pin-outline" style={ionicStyle}/>
        <span className="text-secondary">Location: </span>
        <span className="editable"> </span></li>
    );
  }
}
export default ProfileUserLocation;