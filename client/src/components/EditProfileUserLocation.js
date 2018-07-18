import React, { Component } from 'react'
import {Form, Input, Button} from 'antd'
import {connect} from 'react-redux'
import {updateUser} from '../actions/userActions'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

class EditProfileUserLocation extends Component {
    componentDidMount() {
        this.setInitialValues();
        this.setMap();
    };

    setInitialValues = () => {
        const {form, user} = this.props;
        form.setFieldsValue({
            location: user.location

        });
    };


    setMap = () => {
        /* map initialization */
      const map = new google.maps.Map(document.getElementsByClassName("map-canvas")[0], {
          center: {
              //TODO: get coordinates form db and set them or set default
              lat: 50.5068337,
              lng: 30.5917266
          },
          zoom: 15
      });
        /* interaction with marker */
      const marker = new google.maps.Marker({
          //TODO: get coordinates form db and set them or set default
          position: {
              lat: 50.5068337,
              lng: 30.5917266
          },
          map: map,
          draggable: true
      });
      //TODO: figure out how to get lat lng after dragging
      // TODO: get city, country based on lat, lng
      //TODO: update user location obj on draggable
      //console.log(marker);

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
                //console.log('Received values of form editing: ', values);
                closeOnSubmit();
                let newUserInfo = new Object();
                if (values.location !== user.location) {
                    newUserInfo.location = values.location;
                }
                if(!isEmpty(newUserInfo)) {
                    updateUser(user.id, newUserInfo);
                } else {
                    console.log('nothing has been changes');
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
        updateUser: PropTypes.func.isRequired,
        closeOnSubmit: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    };

    function mapStateToProps({user}){
        return user;
    };

    function dispatchMapStateToProps(dispatch) {
        return {
            updateUser: (id, newUserInfo) => dispatch(updateUser(id, newUserInfo))
        }
    };
export default connect(mapStateToProps, dispatchMapStateToProps)(Form.create()(EditProfileUserLocation));







