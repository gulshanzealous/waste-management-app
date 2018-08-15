import React from 'react'
import {Icon} from 'semantic-ui-react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, MarkerClusterer, TrafficLayer } from "react-google-maps"
import Car from './car.jpg'


class MapComponent extends React.Component{

    constructor(props){
        super(props)
        this.state={
            vehiclesStatic: this.props.vehiclesStatic,
            poisStatic: this.props.poisStatic,
            geofencesStatic: this.props.geofencesStatic,
            vehicles: this.props.vehicles,
            pois: this.props.pois,
            geofences: this.props.geofences,
            vehicleFilters: this.props.vehicleFilters,

            showPoi:false,
            showGeofence:false,
            showTrips:false,
            showNightMode:false,
            showTrafficMode:false,
            
        }
    }

    componentDidMount = () => {
        this.fitBounds()
    }

    componentWillReceiveProps=(nextProps)=>{
        if(this.props.vehicleFilters !== nextProps.vehicleFilters){
            this.adjustFilters(nextProps.vehicleFilters)
        }
    }

    fitBounds = (entities) => {
        const { vehicles, pois, geofences } = this.state
        const allEntities = entities && entities.length ? entities : [...vehicles,...pois,...geofences]
        const bounds = new window.google.maps.LatLngBounds()
        const x = allEntities.map((x, i) => {
            bounds.extend(new window.google.maps.LatLng(
                x.coordinates[0],
                x.coordinates[1]
            ));
        });
        this.refs.map.fitBounds(bounds)
    }

    adjustFilters = (vehicleFilters) => {
        console.log(vehicleFilters)
        const {status, vehicleNumber, poiFilters, geofenceFilters, nightMode, trafficMode} = vehicleFilters
        const { vehicles, pois, geofences, vehiclesStatic, poisStatic, geofencesStatic,
            showPoi, showGeofence, showTrips, showTrafficMode, showNightMode  } = this.state

        const filteredVehicles = vehiclesStatic
                                    .filter(x => {
                                        if(status === 'all'){
                                            return true
                                        }
                                        return x.status === status
                                    })
                                    .filter(x => {
                                        if(vehicleNumber!=='all'){
                                            return vehicleNumber === x.vehicleNo
                                        }
                                        return true
                                    })
        const filteredPois = poisStatic
                                .filter(x => {
                                    if(vehicleNumber!=='all'){
                                        return vehicleNumber === x.vehicleNo
                                    }
                                    return true
                                })
                                .filter(x => {
                                    if(poiFilters === 'hide'){
                                        return false
                                    }
                                    return true
                                })
        
        const filteredGeofences = geofencesStatic
                                .filter(x => {
                                    if(vehicleNumber!=='all'){
                                        return vehicleNumber === x.vehicleNo
                                    }
                                    return true
                                })
                                .filter(x => {
                                    if(geofenceFilters === 'hide'){
                                        return false
                                    }
                                    return true
                                })

        this.fitBounds([...filteredVehicles,...filteredGeofences,...filteredPois])
                                
        this.setState({
            vehicles: filteredVehicles,
            pois: filteredPois,
            geofences: filteredGeofences,
            showNightMode: nightMode==='off'? false: true,
            showTrafficMode: trafficMode==='off'? false: true
        })
        
    }

    render(){
        const { vehicles, pois, geofences, showNightMode, showTrafficMode } = this.state
        console.log(showTrafficMode)
        console.log(vehicles)
        return(
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: 28.592764, lng:  77.205371 }}
                // zoom={props.zoom}
                ref='map'
                // onZoomChanged={props.onZoomChanged}
            >

                    {!!vehicles.length && 
                        vehicles.map(x => (
                            <Marker 
                                key={x.vehicleNo} 
                                position={{ lat: x.coordinates[0], lng: x.coordinates[1] }}
                                icon={<Car />}
                            />
                        ))
                    }

                    {!!pois.length && 
                        pois.map(x => (
                            <Marker key={x.vehicleNo} position={{ lat: x.coordinates[0], lng: x.coordinates[1] }} />
                        ))
                    }

                    {
                        !!showTrafficMode &&
                        <TrafficLayer autoUpdate />
                    }



            </GoogleMap>
        )
    }
}

export default withScriptjs(withGoogleMap(MapComponent))