import React, { Component } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import Chart from './chart';


class Map extends Component {
    componentDidMount() {
        this.state = {
            localidad: null,
            localidades: [
                { lat: 4.699542, lng: -74.036052 },
                { lat: 4.734100, lng: -74.092676 },
                { lat: 4.675247, lng: -74.143148 },
                { lat: 4.649925, lng: -74.064563 },
                { lat: 4.628367, lng: -74.152415 },
                { lat: 4.605439, lng: -74.083437 }
            ]
        }
    }
    constructor() {
        super();
        this.cambiarLocalidad = this.cambiarLocalidad.bind(this);
        this.mapa = this.mapa.bind(this);
    }
    cambiarLocalidad = (e,aa) => {
        console.log(e);
        this.setState({
            localidad: aa,
            localidades: [
                { lat: 4.699542, lng: -74.036052 },
                { lat: 4.734100, lng: -74.092676 },
                { lat: 4.675247, lng: -74.143148 },
                { lat: 4.649925, lng: -74.064563 },
                { lat: 4.628367, lng: -74.152415 },
                { lat: 4.605439, lng: -74.083437 }
            ]
        });
    }

    mapa() {
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: 4.710989, lng: -74.072090 }} >
                <Marker key={1} position={this.state.localidades[0]} onClick={(e) => { this.cambiarLocalidad(e,this.state.localidades[0]) }} icon={{url:'https://image.flaticon.com/icons/svg/190/190640.svg', scaledSize: new window.google.maps.Size(25,25)}}/>
                <Marker key={2} position={this.state.localidades[1]} onClick={(e) => { this.cambiarLocalidad(e,this.state.localidades[1]) }} icon={{url:'https://image.flaticon.com/icons/svg/190/190640.svg', scaledSize: new window.google.maps.Size(25,25)}}/>
                <Marker key={3} position={this.state.localidades[2]} onClick={(e) => { this.cambiarLocalidad(e,this.state.localidades[2]) }} icon={{url:'https://image.flaticon.com/icons/svg/190/190640.svg', scaledSize: new window.google.maps.Size(25,25)}}/>
                <Marker key={4} position={this.state.localidades[3]} onClick={(e) => { this.cambiarLocalidad(e,this.state.localidades[3]) }} icon={{url:'https://image.flaticon.com/icons/svg/190/190640.svg', scaledSize: new window.google.maps.Size(25,25)}}/>
                <Marker key={5} position={this.state.localidades[4]} onClick={(e) => { this.cambiarLocalidad(e,this.state.localidades[4]) }} icon={{url:'https://image.flaticon.com/icons/svg/190/190640.svg', scaledSize: new window.google.maps.Size(25,25)}}/>
                <Marker key={6} position={this.state.localidades[5]} onClick={(e) => { this.cambiarLocalidad(e,this.state.localidades[5]) }} icon={{url:'https://image.flaticon.com/icons/svg/190/190640.svg', scaledSize: new window.google.maps.Size(25,25)}}/>

                {this.state.localidad && (
                    <InfoWindow
                        position={this.state.localidad}
                        onCloseClick={() => { this.cambiarLocalidad(null) }}>
                            <Chart></Chart>
                    </InfoWindow>
                )}
            </GoogleMap>
        );
    } 

    render() {
        const Wrapped = withScriptjs(withGoogleMap(this.mapa));
        return (
            <div style={{ width: '100vw', height: '100vh' }}>
                <Wrapped
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                        process.env.REACT_APP_GOOGLE_KEY
                        }`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}>
                </ Wrapped>
            </div>
        );
    }
}

export default Map;