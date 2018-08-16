import React from 'react'
import styled, {css} from 'styled-components'
import {MapComponent, Toolbar, MapTable, MapInfoBox} from '../../../components'

const RootStyle = styled.div`
    width:100%;
    height:100%;
`

const ActionbarStyle = styled.div`
    min-height:600px;
    width:60px;
    position:absolute;
    right:0;
    top:100px;
    background-color:#0E2F4E;
    border-radius:10px 0px 0px 10px;
    cursor:pointer;
    z-index:20;
    ${props => props.isToolbarExpanded && css`
        width:240px;
    `}
`
const ListStyle = styled.div`
    min-height:700px;
    width:450px;
    position:absolute;
    right:0;
    top:100px;
    border-radius:10px 0px 0px 10px;
    background-color:#0E2F4E;
    cursor:pointer;
    z-index:10;
    /* ${props => props.isToolbarExpanded && css`
        width:240px;
    `} */
`

const InfoBoxStyle = styled.div`
    min-width:300px;
    height:100vh;
    background-color:transparent;
    position:absolute;
    left:70px;
    top:0px;
    border-radius:0px 10px 10px 0px;
    display:grid;
`

class MapBasic extends React.Component {

    state = {
        isToolbarExpanded:false,
        mapZoom:8,

        vehiclesStatic:vehiclesSeed,
        poisStatic:poisSeed,
        geofencesStatic:geofencesSeed,
        tripsStatic:tripsSeed,

        vehicles:vehiclesSeed,
        pois:poisSeed,
        geofences:geofencesSeed,
        trips:tripsSeed,

        filters:{
            vehicles:{
                field:'status', // running, idle, stopped, inactive
                value:'all'
            },
            trips:{
                field:'tripStatus',
                value:'all'
            },
            // poi:'all', // all,hide, searched
            // geofence:'all', // all,hide
            vehicleNumber:'all', // all, vehicleNumber
            lastFilterEntity:'all' // vehicles,pois,geofences,trips (for setbounds)
        },
        toggles:{
            vehicle:true,
            poi:true,
            geofence:true,
            trip:true,
            traffic:false
        },
        listView:{
            // one at a time
            entity:'vehicles', // vehicles,pois,geofences, trips
            visible:false,
            allFields:{
                'vehicles':['vehicleNumber','status','coordinates'],
                'pois':['vehicleNumber','poiName','coordinates'],
                'geofences':['vehicleNumber','geofenceName','coordinates'],
                'trips':['vehicleNumber','tripStatus','coordinates']
            },
            selectedEntity:null
        },

        actions:{
            status:'running', // view-list, search
            poisActions:'', // view-list,create,edit,delete
        },
        infoBox: //null
        {
            
            record: vehiclesSeed[0] ,
            entityName: 'vehicles',
            entityIdentifierKey: 'vehicleIdentifier',
            entityIdentifierValue: 'DL11SH6952',
            allFields:{
                'vehicles':['vehicleNumber','status','coordinates'],
                'pois':['vehicleNumber','poiName','coordinates'],
                'geofences':['vehicleNumber','geofenceName','coordinates'],
                'trips':['vehicleNumber','tripStatus','coordinates']
            },
        }


    }

    toggleExpandedToolbar = () => {
        this.setState({
            isToolbarExpanded: !this.state.isToolbarExpanded
        })
    }

    setFilter = ({ filterKey, filterValue, entity='all', fromTable }) => {
        
        let allFilters = {}
        if(fromTable===true || entity==='pois' || entity==='geofences'){
            allFilters = {
                vehicleNumber:filterValue,
                lastFilterEntity: entity,
                vehicles:{
                    value:'all'
                },
                trips:{
                    value:'all'
                }
            }
        } else {
            allFilters = {
                ...this.state.filters,
                [entity] : { field : filterKey, value: filterValue },
                vehicleNumber: 'all',
                lastFilterEntity: 'all'
            }
        }
        
        // console.log(allFilters)
        const { vehicles: vehicleFilters, trips:tripFilters, vehicleNumber } = allFilters



        const filteredData = this.extractDataforVehicles({ vehicleFilters, tripFilters, vehicleNumber })
        const { vehicles, pois, geofences, trips } = filteredData

        // const calcZoom = filteredData[entity] && filteredData[entity].length === 1 ? 18 : 12
        // console.log(calcZoom)

        this.setState({
            vehicles,
            pois,
            geofences,
            trips,
            // mapZoom:calcZoom,
            filters:{
                ...allFilters
            }
        })
    }


    setToggle = ({ toggleKey }) => {
        this.setState({
            toggles:{
                ...this.state.toggles,
                [toggleKey] :  !this.state.toggles[toggleKey]
            }
        })
    }
 
    setList = ({ listKey }) => {
        this.setState((prevState)=>{
            return {
                listView:{
                    ...prevState.listView,
                    entity:listKey,
                    visible: prevState.listView.entity === listKey ? !prevState.listView.visible : true
                }
            }
        })
    }


    setAction = ({ actionKey, actionValue }) => {
        // this.setState({

        // })
    }

    showInfoBox = ({ entityName, entityIdentifierKey, entityIdentifierValue }) => {
        const record = this.state[entityName]
                        .filter(x => x[entityIdentifierKey] === entityIdentifierValue)[0]
        if(!record){
            return this.setState({
                infoBox:null
            })
        }
        this.setState({
            infoBox:{
                record,
                entityName,
                entityIdentifierKey,
                entityIdentifierValue
            }
        })
    }


    extractDataforVehicles = ({vehicleFilters, tripFilters, vehicleNumber}) => {
        const { vehiclesStatic, poisStatic, geofencesStatic, tripsStatic } = this.state
        
        const vehicles = vehiclesStatic
                                    .filter(x => {
                                        if(vehicleFilters.value === 'all'){
                                            return true
                                        }
                                        return x.status === vehicleFilters.value
                                    })
                                    .filter(x => {
                                        if(vehicleNumber!=='all'){
                                            return vehicleNumber === x.vehicleNumber
                                        }
                                        return true
                                    })
        const pois = poisStatic
                                .filter(x => {
                                    if(vehicleNumber!=='all'){
                                        return vehicleNumber === x.vehicleNumber
                                    }
                                    return true
                                })
        
        const geofences = geofencesStatic
                                .filter(x => {
                                    if(vehicleNumber!=='all'){
                                        return vehicleNumber === x.vehicleNumber
                                    }
                                    return true
                                })
        const trips = tripsStatic.filter(x => {
                                        if(tripFilters.value === 'all'){
                                            return true
                                        }
                                        return x.tripStatus === tripFilters.value
                                    })
                                .filter(x => {
                                    if(vehicleNumber!=='all'){
                                        return vehicleNumber === x.vehicleNumber
                                    }
                                    return true
                                })
                                
        return {
            vehicles, pois, geofences, trips
        }
        
    }

    render(){
        const {isToolbarExpanded, vehicles, pois, geofences, trips,
        toggles, listView, infoBox, mapZoom } = this.state
        const {entity:lastFilterEntity} = this.state.listView
        return(
            <RootStyle>
                <MapComponent 
                    isMarkerShown 
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAsfg3spr8oSlXBAi93MSBe_ZFg1f9Ycg0&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%`, width:'100%' }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%`, width:'100%' }} />}
                    // zoom={mapZoom}

                    vehicles={vehicles}
                    pois={pois}
                    geofences={geofences}
                    trips={trips}

                    lastFilterEntity={lastFilterEntity}

                    toggles={toggles}
                />

                <ActionbarStyle isToolbarExpanded={isToolbarExpanded} >
                    <Toolbar
                        isToolbarExpanded={isToolbarExpanded}
                        toggleExpandedToolbar={this.toggleExpandedToolbar}
                        toolbarFragments={toolbarFragments}
                        setFilter={this.setFilter}
                        setAction={this.setAction}
                        setToggle={this.setToggle}
                        setList={this.setList}
                    />
                </ActionbarStyle>

                {   listView.visible &&
                    <ListStyle >
                        <MapTable 
                            rawData={this.state[listView.entity]}
                            staticData={this.state[`${listView.entity}Static`]}
                            fields={listView.allFields[listView.entity]}
                            showInfoBox={this.showInfoBox}
                            entity={listView.entity}
                            setList={this.setList}
                            setFilter={this.setFilter}
                        />
                    </ListStyle>
                }

                {
                    infoBox && 
                    <InfoBoxStyle>
                        <MapInfoBox
                            record={infoBox.record}
                            entityName={infoBox.entityName}
                            entityIdentifierKey={infoBox.entityIdentifierKey}
                            entityIdentifierValue={infoBox.entityIdentifierValue}
                        />
                    </InfoBoxStyle>
                }

            </RootStyle>
        )
    }
}

export default MapBasic


const toolbarFragments = [
    {
        header:'All Vehicles',
        filterName:'status',
        key:'vehicles',
        value:'all',
        icon:'circle',
        color:'inverted',
        type:'filter',
        children:[
            {
                header:'Running Vehicles',
                type:'filter',
                filterName:'status',
                key:'vehicles',
                color:'green',
                value:'running',
                icon:'circle',
            },
            {
                header:'Idle Vehicles',
                type:'filter',
                filterName:'status',
                key:'vehicles',
                color:'orange',
                value:'idle',
                icon:'circle',
            },
            {
                header:'Stopped Vehicles',
                type:'filter',
                filterName:'status',
                key:'vehicles',
                color:'red',
                value:'stopped',
                icon:'circle',
            },
            {
                header:'Inactive Vehicles',
                type:'filter',
                filterName:'status',
                key:'vehicles',
                color:'grey',
                value:'inactive',
                icon:'circle',
            },
            // {
            //     header:'Search Vehicle',
            //     type:'action',
            //     key:'vehicleNumber',
            //     value:'search-vehicle',
            //     icon:'search',
            // },
            {
                header:'View List',
                type:'list',
                key:'vehicles',
                value:'view-list',
                icon:'list layout',
            },
            {
                header:'Hide Vehicles',
                type:'toggle',
                key:'vehicle',
                value:'toggle',
                icon:'ban',
            },
        ]
    },
    {
        header:'All Trips',
        key:'trips',
        filterName:'tripStatus',
        value:'all',
        type:'filter',
        icon:'rocket',
        color:'inverted',
        children:[
            {
                header:'Ongoing Trips',
                type:'filter',
                key:'trips',
                filterName:'tripStatus',
                color:'green',
                value:'ongoing',
                icon:'rocket',
            },
            {
                header:'Finished Trips',
                type:'filter',
                key:'trips',
                filterName:'tripStatus',
                color:'orange',
                value:'finished',
                icon:'rocket',
            },
            {
                header:'Planned Trips',
                type:'filter',
                key:'trips',
                filterName:'tripStatus',
                color:'blue',
                value:'planned',
                icon:'rocket',
            },
            {
                header:'Abandoned Trips',
                type:'filter',
                key:'trips',
                filterName:'tripStatus',
                color:'red',
                value:'abandoned',
                icon:'rocket',
            },
            // {
            //     header:'Search Trips',
            //     type:'action',
            //     key:'trip',
            //     value:'search-trip',
            //     icon:'search',
            // },
            {
                header:'View List',
                type:'list',
                key:'trips',
                value:'view-list',
                icon:'list layout',
            },
            {
                header:'Hide Trips',
                type:'toggle',
                key:'trip',
                value:'toggle',
                icon:'ban',
            },
        ]
    },
    {
        header:'Point of interest',
        key:'pois',
        value:'all',
        type:'filter',
        icon:'point',
        color:'inverted',
        children:[
            {
                header:'Toggle POIs',
                type:'toggle',
                key:'poi',
                value:'toggle',
                icon:'hide',
            },
            // {
            //     header:'Create POI',
            //     type:'action',
            //     key:'poi',
            //     value:'create',
            //     icon:'add square',
            // },
            // {
            //     header:'Edit POI',
            //     type:'action',
            //     key:'poi',
            //     value:'edit',
            //     icon:'edit',
            // },
            // {
            //     header:'Delete POI',
            //     type:'action',
            //     key:'poi',
            //     value:'delete',
            //     icon:'close',
            // },
            {
                header:'View List',
                type:'list',
                key:'pois',
                value:'view-list',
                icon:'list layout',
            },
        ]
    },
    {
        header:'Geofences',
        key:'geofences',
        value:'all',
        type:'filter',
        icon:'map signs',
        color:'inverted',
        children:[
            {
                header:'Toggle Geofences',
                type:'toggle',
                key:'geofence',
                value:'toggle',
                icon:'hide',
            },
            // {
            //     header:'Create Geofence',
            //     type:'action',
            //     key:'geofence',
            //     value:'create',
            //     icon:'add square',
            // },
            // {
            //     header:'Edit Geofence',
            //     type:'action',
            //     key:'geofence',
            //     value:'edit',
            //     icon:'edit',
            // },
            // {
            //     header:'Delete Geofence',
            //     type:'action',
            //     key:'geofence',
            //     value:'delete',
            //     icon:'close',
            // },
            {
                header:'View List',
                type:'list',
                key:'geofences',
                value:'view-list',
                icon:'list layout',
            },
        ]
    },
    {
        header:'Traffic Mode',
        key:'traffic',
        value:'toggle',
        type:'toggle',
        icon:'road',
        color:'inverted',
        children:[]
    },
    
    
]

// status - running, stopped, idle, inactive, ontrip
// vehicleType - car, truck, motorcyle
const vehiclesSeed = [
    {
        coordinates:[28.731188, 77.127796],
        status:'running',
        vehicleNumber:'DL11SH6952',
        fuel:'60%',
        vehicleType:'car'
    },
    {
        coordinates:[28.725909, 77.061754],
        status:'running',
        vehicleNumber:'DL46FR7832',
        fuel:'80%',
        vehicleType:'truck'
    },
    {
        coordinates:[28.516222, 77.202781],
        status:'stopped',
        vehicleNumber:'UP79NA5634',
        fuel:'20%',
        vehicleType:'car'
    },
    {
        coordinates:[28.648536, 77.273403],
        status:'inactive',
        vehicleNumber:'HR27PT0235',
        fuel:'50%',
        vehicleType:'car'
    },
    {
        coordinates:[28.648216, 77.271202],
        status:'idle',
        vehicleNumber:'DL73UY9834',
        fuel:'50%',
        vehicleType:'car'
    },
    {
        coordinates:[28.658496, 77.450198],
        status:'inactive',
        vehicleNumber:'HR35BC7355',
        fuel:'50%',
        vehicleType:'motorcycle'
    },   
]

const poisSeed = [
    
    {
        coordinates:[28.662130, 77.446014],
        poiName:'Kamla nagar market',
        vehicleNumber:'HR35BC7355',
    },
    {
        coordinates:[28.623010, 77.390599],
        poiName:'Indirapuram',
        vehicleNumber:'HR27PT0235',
    },
]

const geofencesSeed = [
    
    {
        coordinates:[28.662130, 77.446014],
        poiName:'Kamla nagar market',
        vehicleNumber:'HR35BC7355',
    },
    {
        coordinates:[28.623010, 77.390599],
        poiName:'Indirapuram',
        vehicleNumber:'HR27PT0235',
    },
]

const tripsSeed = []