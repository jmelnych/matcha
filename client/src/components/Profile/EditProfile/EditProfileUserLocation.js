import React, { Component } from 'react'
import {Button, message} from 'antd'
import {connect} from 'react-redux'
import {saveLocation} from '../../../actions/userActions'
import PropTypes from 'prop-types'
import {decodeLocation} from '../../../api/decodeLocation'

class EditProfileUserLocation extends Component {
    state = {
      input: '',
      lat: null,
      lng: null
    };
    componentDidMount() {
        this.setMap();
    };

    setMap = () => {
        /* map initialization */
        let saveFnc = this.props.saveLocation;
      const map = new google.maps.Map(document.getElementsByClassName("map-canvas")[0], {

          center: {
              lat: this.props.user.location.lat,
              lng: this.props.user.location.lng
          },
          zoom: 15
      });
        /* interaction with marker */
      const marker = new google.maps.Marker({
          position: {
              lat: this.props.user.location.lat,
              lng: this.props.user.location.lng
          },
          map: map,
          draggable: true
      });
        google.maps.event.addListener(marker, 'dragend', function(){
            (async function () {
                let locationObj = await decodeLocation(this.getPosition().lat(), this.getPosition().lng());
                if (locationObj) {
                    saveFnc({location: locationObj});
                }
            }).bind(this)();
        });

        /* interaction with input field*/
        const searchBox = new google.maps.places.SearchBox(document.getElementsByClassName("map-input-search")[0]);
        //place change event on search box:

        google.maps.event.addListener(searchBox, 'places_changed', function(){
            let places = searchBox.getPlaces();
            this.setState({
                input: places[0].formatted_address
            });
            const bounds = new google.maps.LatLngBounds();
            places.map(place => {
                bounds.extend(place.geometry.location);
                marker.setPosition(place.geometry.location);
                this.setState({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                });

            });
            map.fitBounds(bounds);
            map.setZoom(15);
        }.bind(this));
    };

    onSubmit = (e) => {
        const { closeOnSubmit, saveLocation } = this.props;
        e.preventDefault();
        const {lat, lng} = this.state;
        if (lat && lng) {
            (async function () {
                let locationObj = await decodeLocation(lat, lng);
                saveLocation({location: locationObj});
            })();
        closeOnSubmit();
        } else {
            message.error('Please input your location');
        }
    };
render() {
    return (
        <div>
            <div className="form-items">
                <input name="location" onChange={(e) => this.setState({input: e.target.value})}
                   value={this.state.input} className="map-input-search"/>
                <Button className="right-button" type='primary'
                        htmlType='submit' onClick={this.onSubmit}>Update location</Button>
            </div>
            <div className="map-canvas">
            </div>
        </div>
    );
  }
};

    EditProfileUserLocation.propTypes = {
        saveLocation: PropTypes.func.isRequired,
        closeOnSubmit: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    };

    function mapStateToProps({user}){
        return user;
    };

    function dispatchMapStateToProps(dispatch) {
        return {
            saveLocation: (newUserInfo) => dispatch(saveLocation(newUserInfo))
        }
    };
export default connect(mapStateToProps, dispatchMapStateToProps)(EditProfileUserLocation);







