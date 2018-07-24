import React, { Component } from 'react'
import {Form, Input, Button, message} from 'antd'
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
        const searchBox = new google.maps.places.SearchBox(document.getElementsByClassName("map-search")[0]);
        //place change event on search box:

        google.maps.event.addListener(searchBox, 'places_changed', function(){
            let places = searchBox.getPlaces();
            //console.log('place inserted', places[0].formatted_address);
            this.setState({
                input: places[0].formatted_address
            });
            const bounds = new google.maps.LatLngBounds();
            places.map(place => {
                console.log('place geometry location', place.geometry.location);
                console.log('inside map places', this);
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
        //TODO: get lat lng after searching
        // TODO: get city, country based on lat, lng
        //TODO: update user location obj on draggable
    };

    onSubmit = (e) => {
        const { form, closeOnSubmit, saveLocation } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form editing: ', values);
                //TODO: update user position on backend
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
            }
        })
    };
render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout      = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 8}
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16}
        }
    };
    console.log(this.state.input);
    return (
        <div>
            <Form onSubmit={this.onSubmit}>
                <Form.Item {...formItemLayout} className="form-item-inline" label='Location'> {
                    getFieldDecorator('location')
                    (< Input name="location" className="map-search"/>)
                }
                </Form.Item>
                <Button className="right-button" type='primary'
                        htmlType='submit'>Update location</Button>
            </Form>
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
export default connect(mapStateToProps, dispatchMapStateToProps)(Form.create()(EditProfileUserLocation));







