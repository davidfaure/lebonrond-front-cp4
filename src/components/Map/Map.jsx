import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

export class MapContainer extends Component {

  render() {
    return (
      <Map
      google={this.props.google}
      zoom={8}
      style={mapStyles}
      initialCenter={{ lat: 47.444, lng: -122.176}}
    />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDHm68e82IospDB00QL271bbHewxR37jAU',
})(MapContainer)