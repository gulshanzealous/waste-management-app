import React from 'react'
// import {Icon} from 'semantic-ui-react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, TrafficLayer } from "react-google-maps"

const basePath = "./images"

class MapComponent extends React.Component{

    constructor(props){
        super(props)
        this.state={
            bins: this.props.bins,

            showBin: this.props.toggles.bin
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
            this.props.bins !== nextProps.bins
         ) {
                const { bins } = nextProps
                let {lastFilterEntity} = nextProps
                let entitiesForBounds = []
                if(lastFilterEntity === 'all'){
                    entitiesForBounds = [...bins]
                }else{
                    entitiesForBounds = nextProps[lastFilterEntity]
                }
                this.fitBounds([...entitiesForBounds])
                this.setState({
                    bins
                })
        }

        if(this.props.toggles !== nextProps.toggles){
            this.setState({
                showBin: nextProps.toggles.bin,
            })
        }
    }

    fitBounds = (entities) => {
        const { bins } = this.state
        const allEntities = entities && entities.length ? entities : [...bins]

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

    onClickbin = (bin) => {
        this.props.setSelectedbin(bin)
    }

    
    render(){
        const { bins,
        showBin} = this.state
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

                    {!!showBin && !!bins.length && 
                        bins.map((x,i) => (
                            <Marker 
                                key={i} 
                                position={{ lat: x.coordinates[0], lng: x.coordinates[1] }}
                                icon={{
                                    url: require(`${basePath}/${x.binType}-${x.status}.svg`),
                                    // url: require(`${bikePath}`),
                                    scaledSize: new window.google.maps.Size(70,70)
                                }}
                                onClick={this.onClickbin.bind(this,x)}
                            />
                        ))
                    }




            </GoogleMap>
        )
    }
}

export default withScriptjs(withGoogleMap(MapComponent))