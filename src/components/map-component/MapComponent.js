import React from 'react'
import {Icon} from 'semantic-ui-react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, MarkerClusterer,MarkerWithLabel, TrafficLayer } from "react-google-maps"

const basePath = "./images"

class MapComponent extends React.Component{

    constructor(props){
        super(props)
        this.state={
            vehicles: this.props.vehicles,
            pois: this.props.pois,
            geofences: this.props.geofences,
            trips: this.props.trips,

            showVehicle: this.props.toggles.vehicle,
            showPoi: this.props.toggles.poi,
            showGeofence: this.props.toggles.geofence,
            showTrip: this.props.toggles.trip,
            showTraffic: this.props.toggles.traffic
        }
    }

    componentDidMount = () => {
        this.fitBounds()
    }

    componentWillReceiveProps=(nextProps)=>{
        if(
            this.props.vehicles !== nextProps.vehicles ||
            this.props.pois !== nextProps.pois ||
            this.props.geofences !== nextProps.geofences ||
            this.props.trips !== nextProps.trips ) {
                const { vehicles, pois, geofences, trips } = nextProps
                this.fitBounds([...vehicles,...pois,...geofences, ...trips])
                this.setState({
                    vehicles, pois, geofences, trips
                })
        }

        if(this.props.toggles !== nextProps.toggles){
            this.setState({
                showVehicle: nextProps.toggles.vehicle,
                showPoi: nextProps.toggles.poi,
                showGeofence: nextProps.toggles.geofence,
                showTrip: nextProps.toggles.trip,
                showTraffic: nextProps.toggles.traffic
            })
        }
    }

    fitBounds = (entities) => {
        console.log(this.state)
        const { vehicles, pois, geofences, trips } = this.state
        const allEntities = entities && entities.length ? entities : [...vehicles,...pois,...geofences, ...trips]

        const bounds = new window.google.maps.LatLngBounds()
        const x = allEntities.map((x, i) => {
            bounds.extend(new window.google.maps.LatLng(
                x.coordinates[0],
                x.coordinates[1]
            ));
        });
        this.refs.map.fitBounds(bounds)
    }

    onResize = () => {
        this.fitBounds()
    }

    
    render(){
        const { vehicles, pois, geofences, trips,
        showVehicle,showPoi,showGeofence,showTrip,showTraffic} = this.state
        console.log(this.state)
        return(
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: 28.592764, lng:  77.205371 }}
                // zoom={props.zoom}
                ref='map'
                onResize={this.onResize}
            >

                    {!!showVehicle && !!vehicles.length && 
                        vehicles.map(x => (
                            <Marker 
                                key={x.vehicleNo} 
                                position={{ lat: x.coordinates[0], lng: x.coordinates[1] }}
                                icon={{
                                    url: require(`${basePath}/${x.vehicleType}-${x.status}.svg`),
                                    // url: require(`${bikePath}`),
                                    scaledSize: new window.google.maps.Size(70,70)
                                }}
                                
                            />
                        ))
                    }

                    {!!showPoi && !!pois.length && 
                        pois.map(x => (
                            <Marker key={x.vehicleNo} position={{ lat: x.coordinates[0], lng: x.coordinates[1] }} />
                        ))
                    }

                    {
                        !!showTraffic &&
                        <TrafficLayer autoUpdate />
                    }



            </GoogleMap>
        )
    }
}

export default withScriptjs(withGoogleMap(MapComponent))