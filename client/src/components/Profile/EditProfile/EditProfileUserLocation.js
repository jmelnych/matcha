import React, { Component } from 'react'
import {Form, Input, Button} from 'antd'
import {connect} from 'react-redux'
import {saveLocation} from '../../../actions/userActions'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import {decodeLocation} from '../../../api/decodeLocation'

class EditProfileUserLocation extends Component {
    componentDidMount() {
        this.setMap();
    };


    setMap = () => {
        /* map initialization */
        let saveFnc = this.props.saveLocation;
        console.log('saveFnc', saveFnc);
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

      // TODO: get city, country based on lat, lng
      //TODO: update user location obj on draggable
        google.maps.event.addListener(marker, 'dragend', function(){
            console.log(this.getPosition().lat());
            console.log(this.getPosition().lng());
            let locationObj = decodeLocation(this.getPosition().lat(), this.getPosition().lng());
            //TODO: get resolved obj from decodeLocation fnc and update user location on backend
            saveFnc({location: locationObj});

        });

        /* interaction with input field*/
        const searchBox = new google.maps.places.SearchBox(document.getElementsByClassName("map-search")[0]);
        //console.log(searchBox);
        //place change event on search box:
        google.maps.event.addListener(searchBox, 'places_changed', function(){
            let places = searchBox.getPlaces();
            console.log('places', places);//geometry=>lng, lat func
            const bounds = new google.maps.LatLngBounds();
            places.map(place => {
                console.log('place geometry location', place.geometry.location);
                bounds.extend(place.geometry.location);
                marker.setPosition(place.geometry.location);
            });
            map.fitBounds(bounds);
            map.setZoom(15);
        });
        //TODO: get lat lng after searching
        // TODO: get city, country based on lat, lng
        //TODO: update user location obj on draggable
    };

    onSubmit = (e) => {
        const { form, closeOnSubmit, user, updateUser } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form editing: ', values);
                closeOnSubmit();
                //TODO: update user position on backend
        //         let newUserInfo = new Object();
        //         if (values.location !== user.location) {
        //             newUserInfo.location = values.location;
        //         }
        //         if(!isEmpty(newUserInfo)) {
        //             updateUser(newUserInfo);
        //         } else {
        //             console.log('nothing has been changes');
        //         }
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
    return (
        <div>
            <Form onSubmit={this.onSubmit}>
                <Form.Item {...formItemLayout} className="form-item-inline" label='Location'> {
                    getFieldDecorator('location', {
                        validateTrigger: 'onBlur'
                    })(< Input name="location" className="map-search"/>)
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







