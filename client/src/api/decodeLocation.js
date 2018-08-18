export const decodeLocation = (lat, lng) => {
    return new Promise(function(resolve, reject) {
        const geocoder = new google.maps.Geocoder();
        const latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1] && results[1].address_components) {
                    const addressComponents = results[1].address_components;
                    let city = '';
                    let country = '';
                    addressComponents.map(compo => {
                        if (compo.types){
                            compo.types.map(type => {
                                if (type === 'locality' || (city === '' && type === 'administrative_area_level_1')){
                                    city = compo.long_name;
                                }
                                if (type === 'country') {
                                    country = compo.long_name;
                                }
                            })
                        }
                    });

                    let locationObj = {
                        lat,
                        lng,
                        city,
                        country
                    };
                    resolve (locationObj);
                } else {
                    console.log("No results found");
                    reject("No results found");
                }
            } else {
                console.log("Geocoder failed due to: " + status);
                reject("Geocoder failed due to: " + status);
            }
        })
    });
};
