import React from 'react'
// import {Icon} from 'semantic-ui-react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, TrafficLayer } from "react-google-maps"

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

        this.map = null
    }

    onMapMounted = (ref) => {
        // console.log(ref)
        this.map = ref
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
                let {lastFilterEntity} = nextProps
                let entitiesForBounds = []
                if(lastFilterEntity === 'all'){
                    entitiesForBounds = [...vehicles,...pois,...geofences, ...trips]
                }else{
                    entitiesForBounds = nextProps[lastFilterEntity]
                }
                this.fitBounds([...entitiesForBounds])
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
        const { vehicles, pois, geofences, trips } = this.state
        const allEntities = entities && entities.length ? entities : [...vehicles,...pois,...geofences, ...trips]

        const bounds = new window.google.maps.LatLngBounds()
        allEntities.forEach((x) => {
            bounds.extend(new window.google.maps.LatLng(
                x.coordinates[0],
                x.coordinates[1]
            ));
        });
        this.map.fitBounds(bounds)
    }

    onResize = () => {
        this.fitBounds()
    }

    onClickVehicle = (vehicle) => {
        this.props.setSelectedVehicle(vehicle)
    }

    onClickGeofence = (geofence) => {
        this.props.setSelectedGeofence(geofence)
    }

    onClickPoi = (poi) => {
        this.props.setSelectedPoi(poi)
    }
    
    render(){
        const { vehicles, pois, geofences, trips,
        showVehicle,showPoi,showGeofence,showTrip,showTraffic} = this.state
        return(
            <GoogleMap
                defaultCenter={{ lat: 28.592764, lng:  77.205371 }}
                // zoom={this.props.zoom}
                ref={this.onMapMounted}
                onResize={this.onResize}
                defaultOptions={{
                    minZoom:6,
                    maxZoom:18
                    // fullscreenControl: false,
                    // zoomControl: false,
                    // streetViewControl: false,
                    // scaleControl: true,
                    // mapTypeControl: true,
                    // mapTypeControlOptions,
                    // styles: [...administrative, ...landscape, ...poi, ...road, ...transit, ...water]
                  }}
            >

                    {!!showVehicle && !!vehicles.length && 
                        vehicles.map((x,i) => (
                            <Marker 
                                key={i} 
                                position={{ lat: x.coordinates[0], lng: x.coordinates[1] }}
                                icon={{
                                    url: require(`${basePath}/${x.vehicleType}-${x.status}.svg`),
                                    // url: require(`${bikePath}`),
                                    scaledSize: new window.google.maps.Size(70,70)
                                }}
                                onClick={this.onClickVehicle.bind(this,x)}
                            />
                        ))
                    }

                    {!!showTrip && !!trips.length &&
                        trips.map((x,i) => (
                            <Marker key={i} position={{ lat: x.coordinates[0], lng: x.coordinates[1] }}
                             />
                        ))
                    }

                    {!!showPoi && !!pois.length && 
                        pois.map((x,i) => (
                            <Marker 
                            key={i} 
                            position={{ lat: x.coordinates[0], lng: x.coordinates[1] }}
                            onClick={this.onClickPoi.bind(this,x)}

                             />
                        ))
                    }

                    {!!showGeofence && !!geofences.length &&
                        geofences.map((x,i) => (
                            <Marker 
                            key={i} 
                            position={{ lat: x.coordinates[0], lng: x.coordinates[1] }} 
                            onClick={this.onClickGeofence.bind(this,x)}

                            />
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