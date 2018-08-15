import React from 'react'
import styled, {css} from 'styled-components'
import {MapComponent, Toolbar} from '../../../components'

const RootStyle = styled.div`
    width:100%;
    height:100%;
`

const ActionbarStyle = styled.div`
    min-height:500px;
    width:60px;
    position:absolute;
    right:0;
    top:200px;
    background-color:#0E2F4E;
    border-radius:10px 0px 0px 10px;
    cursor:pointer;

    ${props => props.isToolbarExpanded && css`
        width:240px;
    `}
`


class MapBasic extends React.Component {

    state = {
        isToolbarExpanded:false,
        vehiclesStatic:vehiclesSeed,
        poisStatic:poisSeed,
        geofencesStatic:geofencesSeed,
        vehicles:vehiclesSeed,
        pois:poisSeed,
        geofences:geofencesSeed,
        filters:{
            status:'running', // running, idle, stopped, inactive
            vehicleNumber:'all', // all, vehicleNo
            poiFilters:'all', // all,hide,
            geofenceFilters:'all', // all,hide
            nightMode: 'off', //off,on
            trafficMode: 'off', //off,on
        },
        actions:{
            status:'running', // view-list, search
            poisActions:'', // view-list,create,edit,delete
        }
    }

    toggleExpandedToolbar = () => {
        this.setState({
            isToolbarExpanded: !this.state.isToolbarExpanded
        })
    }

    setFilter = ({ filterKey, filterValue }) => {
        this.setState({
            filters:{
                ...this.state.filters,
                [filterKey]: filterValue
            }
        })
    }

    setAction = ({ actionKey, actionValue }) => {
        // this.setState({

        // })
    }
 
    render(){
        const {isToolbarExpanded, vehicles, pois, geofences, vehiclesStatic,poisStatic, geofencesStatic,
              filters, showPoi, showGeofence, showTrips, nightMode, trafficMode } = this.state

        return(
            <RootStyle>
                <MapComponent 
                    isMarkerShown 
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAsfg3spr8oSlXBAi93MSBe_ZFg1f9Ycg0&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%`, width:'100%' }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%`, width:'100%' }} />}
                    vehiclesStatic={vehiclesStatic}
                    poisStatic={poisStatic}
                    geofencesStatic={geofencesStatic}

                    vehicles={vehicles}
                    pois={pois}
                    geofences={geofences}
                    
                    vehicleFilters={filters}
                />

                <ActionbarStyle isToolbarExpanded={isToolbarExpanded} >
                    <Toolbar
                        isToolbarExpanded={isToolbarExpanded}
                        toggleExpandedToolbar={this.toggleExpandedToolbar}
                        toolbarFragments={toolbarFragments}
                        setFilter={this.setFilter}
                        setAction={this.setAction}
                    />
                </ActionbarStyle>

            </RootStyle>
        )
    }
}

export default MapBasic


const toolbarFragments = [
    {
        header:'All Vehicles',
        key:'status',
        value:'all',
        icon:'circle',
        color:'white',
        type:'filter',
        children:[
            {
                header:'Running Vehicles',
                type:'filter',
                key:'status',
                color:'green',
                value:'running',
                icon:'circle',
            },
            {
                header:'Idle Vehicles',
                type:'filter',
                key:'status',
                color:'orange',
                value:'idle',
                icon:'circle',
            },
            {
                header:'Stopped Vehicles',
                type:'filter',
                key:'status',
                color:'red',
                value:'stopped',
                icon:'circle',
            },
            {
                header:'Inactive Vehicles',
                type:'filter',
                key:'status',
                color:'grey',
                value:'inactive',
                icon:'circle',
            },
            {
                header:'Search Vehicle',
                type:'action',
                key:'status',
                value:'search-vehicle',
                icon:'search',
            },
            {
                header:'View List',
                type:'action',
                key:'status',
                value:'view-list',
                icon:'expand arrows alternate',
            },
        ]
    },
    {
        header:'Point of interest',
        key:'poi',
        value:'all',
        type:'filter',
        icon:'point',
        color:'white',
        children:[
            {
                header:'Hide POIs',
                type:'filter',
                key:'poi',
                value:'hide',
                icon:'hide',
            },
            {
                header:'Create POI',
                type:'action',
                key:'poi',
                value:'create',
                icon:'add square',
            },
            {
                header:'Edit POI',
                type:'action',
                key:'poi',
                value:'edit',
                icon:'edit',
            },
            {
                header:'Delete POI',
                type:'action',
                key:'poi',
                value:'delete',
                icon:'close',
            },
            {
                header:'View List',
                type:'action',
                key:'poi',
                value:'view-list',
                icon:'expand arrows alternate',
            },
        ]
    },
    {
        header:'Traffic Mode',
        key:'trafficMode',
        value:'on',
        type:'filter',
        icon:'road',
        color:'white',
        children:[]
    },
    
    
]

// status - running, stopped, idle, inactive, ontrip
// vehicleType - car, truck, motorcyle
const vehiclesSeed = [
    {
        coordinates:[28.731188, 77.127796],
        status:'running',
        vehicleNo:'DL11SH6952',
        fuel:'60%',
        vehicleType:'car'
    },
    {
        coordinates:[28.725909, 77.061754],
        status:'running',
        vehicleNo:'DL46FR7832',
        fuel:'80%',
        vehicleType:'truck'
    },
    {
        coordinates:[28.516222, 77.202781],
        status:'stopped',
        vehicleNo:'UP79NA5634',
        fuel:'20%',
        vehicleType:'car'
    },
    {
        coordinates:[28.648536, 77.273403],
        status:'inactive',
        vehicleNo:'HR27PT0235',
        fuel:'50%',
        vehicleType:'car'
    },
    {
        coordinates:[28.648216, 77.271202],
        status:'idle',
        vehicleNo:'DL73UY9834',
        fuel:'50%',
        vehicleType:'car'
    },
    {
        coordinates:[28.658496, 77.450198],
        status:'inactive',
        vehicleNo:'HR35BC7355',
        fuel:'50%',
        vehicleType:'motorcyle'
    },   
]

const poisSeed = [
    
    {
        coordinates:[28.662130, 77.446014],
        poiName:'Kamla nagar market',
        vehicleNo:'HR35BC7355',
    },
    {
        coordinates:[28.623010, 77.390599],
        poiName:'Indirapuram',
        vehicleNo:'HR27PT0235',
    },
]

const geofencesSeed = [
    
    {
        coordinates:[28.662130, 77.446014],
        poiName:'Kamla nagar market',
        vehicleNo:'HR35BC7355',
    },
    {
        coordinates:[28.623010, 77.390599],
        poiName:'Indirapuram',
        vehicleNo:'HR27PT0235',
    },
]