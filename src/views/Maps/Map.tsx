import React, { FC, FormEvent, Component, ReactElement } from 'react'
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from 'react-google-maps'
import axios from 'axios'
// import Geocode from '../../lib/react-geocode/geocode'
// Geocode.setApiKey('AIzaSyCIDMqoktLOEn-M3hac_ZA1NEF4WJI6oy4')

type MyProps = {
  google: string
  zoom: number
  height: string
  simple: boolean
  center: { lat: number; lng: number }
  // proc: (event: React.MouseEvent<HTMLButtonElement>) => void
  proc: (address: string, latValue: number, lngValue: number) => void
}
type MyState = {
  address: string
  city: string
  area: string
  state: string
  mapPosition: { lat: number; lng: number }
  markerPosition: { lat: number; lng: number }
}
class Map extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)

    this.state = {
      address: '',
      city: '',
      area: '',
      state: '',
      mapPosition: this.props.center,
      markerPosition: this.props.center,
    }
  }
  //   /**
  //    * Get the current address from the default map position and set those values in the state
  //    */
  componentDidMount() {
    setTimeout(() => {
      let latlng = {
        lat: this.state.mapPosition.lat,
        lng: this.state.mapPosition.lng,
      }
      let geocoder = new google.maps.Geocoder()
      let self = this
      geocoder.geocode({ location: latlng }, function(
        results: any,
        status: any,
      ) {
        if (status === 'OK') {
          if (results[0]) {
            const address = results[0].formatted_address,
              addressArray = results[0].address_components,
              city = self.getCity(addressArray),
              area = self.getArea(addressArray),
              state = self.getState(addressArray)
            console.log('city', city, area, state)
            self.setState({
              address: address ? address : '',
              area: area ? area : '',
              city: city ? city : '',
              state: state ? state : '',
            })
          }
        }
      })
    }, 100)
  }
  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    if (
      this.state.address !== nextState.address ||
      this.state.city !== nextState.city ||
      this.state.area !== nextState.area ||
      this.state.state !== nextState.state
    ) {
      return true
    }
    return false
  }
  /**
   * Get the city and set the city input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getCity = (addressArray: any): string | undefined => {
    let city = ''
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        'administrative_area_level_2' === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name
        return city
      }
    }
  }
  /**
   * Get the area and set the area input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getArea = (addressArray: any): string | undefined => {
    let area = ''
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            'sublocality_level_1' === addressArray[i].types[j] ||
            'locality' === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name
            return area
          }
        }
      }
    }
  }
  /**
   * Get the address and set the address input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getState = (addressArray: any): string | undefined => {
    let state = ''
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          'administrative_area_level_1' === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name
          return state
        }
      }
    }
  }
  //   /**
  //    * And function for city,state and address input
  //    * @param event
  //    */
  onChange = (event: FormEvent<HTMLInputElement>): void => {
    // this.setState({ [event.target.name]: event.target.value })
  }
  //   /**
  //    * This Event triggers when the marker window is closed
  //    *
  //    * @param event
  //    */
  onInfoWindowClose = (event: any): void => {}

  onMarkerDragEnd = (event: any): void => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng()

    console.log(newLat, newLng)

    let latlng = { lat: newLat, lng: newLng }
    let geocoder = new google.maps.Geocoder()
    let self = this
    geocoder.geocode({ location: latlng }, function(results: any, status: any) {
      if (status === 'OK') {
        if (results[0]) {
          const address = results[0].formatted_address,
            addressArray = results[0].address_components,
            city = self.getCity(addressArray),
            area = self.getArea(addressArray),
            state = self.getState(addressArray)
          self.setState({
            address: address ? address : '',
            area: area ? area : '',
            city: city ? city : '',
            state: state ? state : '',
            markerPosition: {
              lat: newLat,
              lng: newLng,
            },
            mapPosition: {
              lat: newLat,
              lng: newLng,
            },
          })
          if (self.props.proc) self.props.proc(address, newLat, newLng)
        }
      }
    })
  }

  //   /**
  //    * When the user types an address in the search box
  //    * @param place
  //    */
  onPlaceSelected = (place: any): any => {
    console.log('plc', place)
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng()
    // Set these values in the state.
    this.setState({
      address: address ? address : '',
      area: area ? area : '',
      city: city ? city : '',
      state: state ? state : '',
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    })
    if (this.props.proc) this.props.proc(address, latValue, lngValue)
  }

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap(
        (props: any): ReactElement => (
          <GoogleMap
            // google={this.props.google}
            defaultZoom={this.props.zoom}
            defaultCenter={{
              lat: this.state.mapPosition.lat,
              lng: this.state.mapPosition.lng,
            }}
          >
            {/* InfoWindow on top of marker */}
            <InfoWindow
              // onClose={this.onInfoWindowClose}
              position={{
                lat: this.state.markerPosition.lat + 0.0018,
                lng: this.state.markerPosition.lng,
              }}
            >
              <div>
                <span style={{ padding: 0, margin: 0 }}>
                  {this.state.address}
                </span>
              </div>
            </InfoWindow>
            {/*Marker*/}
            <Marker
              // google={this.props.google}
              // name={'Dolores park'}
              draggable={true}
              onDragEnd={this.onMarkerDragEnd}
              position={{
                lat: this.state.markerPosition.lat,
                lng: this.state.markerPosition.lng,
              }}
            />
            <Marker />
          </GoogleMap>
        ),
      ),
    )
    let map
    if (this.props.center.lat !== undefined) {
      map = (
        <div>
          <div className={this.props.simple ? 'hidden' : ''}>
            <div className="form-group">
              <label htmlFor="">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                onChange={this.onChange}
                readOnly={true}
                value={this.state.city}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Area</label>
              <input
                type="text"
                name="area"
                className="form-control"
                onChange={this.onChange}
                readOnly={true}
                value={this.state.area}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                onChange={this.onChange}
                readOnly={true}
                value={this.state.state}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                onChange={this.onChange}
                readOnly={true}
                value={this.state.address}
              />
            </div>
          </div>

          <AsyncMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCIDMqoktLOEn-M3hac_ZA1NEF4WJI6oy4&libraries=places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: this.props.height }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      )
    } else {
      map = <div style={{ height: this.props.height }} />
    }
    return map
  }
}
export default Map
