import React from 'react'
import styled, {css} from 'styled-components'
import {MapComponent, Toolbar, MapTable, MapInfoBox} from '../../../components'
import {Motion, spring} from 'react-motion';

const RootStyle = styled.div`
    width:100%;
    height:100%;
`

const ActionbarStyle = styled.div`
    min-height:350px;
    width:60px;
    position:absolute;
    right:0;
    top:200px;
    background-color:#0E2F4E;
    border-radius:10px 0px 0px 10px;
    cursor:pointer;
    z-index:20;
    /* border-color:#fff;
    border-width:0px 0px 1px 1px;
    border-style:solid; */
    box-shadow: -1px 1px 1px 1px rgba(170,170,170,1);


    ${props => props.isToolbarExpanded && css`
        width:300px;
    `}
`
const ListStyle = styled.div`
    min-height:700px;
    width:0px;
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
        // mapZoom:8,

        binsStatic:[],

        bins:[],

        filters:{
            bins:{
                field:'status',
                value:'all'
            },
            binNumber:'all', // all, binNumber
            lastFilterEntity:'all' // bins,pois,geofences,trips (for setbounds)
        },
        toggles:{
            bin:true,
        },
        listView:{
            // one at a time
            entity:'bins',
            visible:false,
            allFields:{
                'bins':['binNumber','status','coordinates'],
            },
            selectedEntity:null,
            listWidthBefore:0,
            listWidthAfter:0
        },

        actions:{
            status:'empty', // view-list, search
        },
        infoBox: {
            record:null,
            entityName:null,
            entityIdentifierKey:null,
            entityIdentifierValue:null,
            allFields:{
                'bins':['binNumber','status','coordinates','fill','binType'],
            },
        },


    }

    componentDidMount = () => {
        this.setState({
            bins: this.props.binsSeed,
            binsStatic: this.props.binsSeed,
            
        })
    }

    componentWillUnmount = () => {
        this.setState({
            listView:{
                ...this.state.listView,
                visible:false
            }
        })

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
                binNumber:filterValue,
                lastFilterEntity: entity,
                bins:{
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
                binNumber: 'all',
                lastFilterEntity: 'all'
            }
        }
        
        // console.log(allFilters)
        const { bins: binFilters, binNumber } = allFilters



        const filteredData = this.extractDataforbins({ binFilters, binNumber })
        const { bins } = filteredData

        // const calcZoom = filteredData[entity] && filteredData[entity].length === 1 ? 18 : 12
        // console.log(calcZoom)

        this.setState({
            bins,
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
            const isVisible = prevState.listView.entity === listKey ? !prevState.listView.visible : true
            const infoBoxState = isVisible? 
                this.state.infoBox :
                {

                    ...this.state.infoBox,
                    record:null,
                    entityName:null,
                    entityIdentifierKey:null,
                    entityIdentifierValue:null
                }

            return {
                listView:{
                    ...prevState.listView,
                    entity:listKey,
                    visible: isVisible,
                    listWidthBefore: isVisible? 0 : 450,
                    listWidthAfter: isVisible? 450 : 0
                },
                infoBox: infoBoxState
            }
        })
    }


    setAction = ({ actionKey, actionValue }) => {
        // this.setState({

        // })
    }

    showInfoBox = ({ entityName, entityIdentifierKey, entityIdentifierValue, infoBoxVisible }) => {
        // console.log(entityName)
        // console.log(entityIdentifierKey)
        // console.log(entityIdentifierValue)

        if(infoBoxVisible === false){
            return this.setState({
                infoBox:{
                    ...this.state.infoBox,
                    record:null,
                    entityName:null,
                    entityIdentifierKey:null,
                    entityIdentifierValue:null
                },
                bins:binsSeed,
            })
        }

        if(this.state.infoBox && 
            this.state.infoBox.entityName === entityName &&
            this.state.infoBox.entityIdentifierKey === entityIdentifierKey &&
            this.state.infoBox.entityIdentifierValue === entityIdentifierValue
        ){
            return this.setState({
                infoBox:{
                    ...this.state.infoBox,
                    record:null,
                    entityName:null,
                    entityIdentifierKey:null,
                    entityIdentifierValue:null
                }
            })
        }
        
        const record = this.state[`${entityName}Static`]
                        .filter(x => x[entityIdentifierKey] === entityIdentifierValue)[0]
        if(!record){
            return this.setState({
                infoBox:{
                    ...this.state.infoBox,
                    record:null,
                    entityName:null,
                    entityIdentifierKey:null,
                    entityIdentifierValue:null
                }
            })
        }

        this.setState({
            infoBox:{
                ...this.state.infoBox,
                record,
                entityName,
                entityIdentifierKey,
                entityIdentifierValue
            }
        })
    }

    setSelectedbin = (bin) => {
        this.setState((prevState)=>{
            return {
                bins: [bin]
            }
        })
        this.showInfoBox({
            entityName: 'bins',
            entityIdentifierKey: 'binNumber',
            entityIdentifierValue: bin.binNumber,
            infoBoxVisible:true
        })
    }
    

    extractDataforbins = ({binFilters, binNumber}) => {
        const { binsStatic } = this.state
        
        const bins = binsStatic
            .filter(x => {
                if(binFilters.value === 'all'){
                    return true
                }
                return x.status === binFilters.value
            })
            .filter(x => {
                if(binNumber!=='all'){
                    return binNumber === x.binNumber
                }
                return true
            })
                                
        return {
            bins
        }
        
    }

    render(){
        const {isToolbarExpanded, bins,
        toggles, listView, infoBox } = this.state
        const {entity:lastFilterEntity} = this.state.listView
        const config = {stiffness:850, damping:50}

        return(
            <Motion
                defaultStyle={{
                    width: this.state.listView.listWidthBefore
                }}
                style={{
                    width:spring(this.state.listView.listWidthAfter)
                }}
            >
            {
            value => 
            <RootStyle>
                <MapComponent 
                    isMarkerShown 
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAsfg3spr8oSlXBAi93MSBe_ZFg1f9Ycg0&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={
                        <img 
                            src={require('../logo.gif')}
                            style={{ 
                                height:'50px',
                                width:'50px',
                                position:'absolute',
                                top:'35%',
                                left:'48%'
                            }} 
                        />
                    }
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%`, width:'100%' }} />}
                    // zoom={mapZoom}

                    bins={bins}

                    lastFilterEntity={lastFilterEntity}

                    toggles={toggles}

                    setSelectedbin={this.setSelectedbin}
                    setSelectedPoi={this.setSelectedPoi}
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

                {   
                    // listView.visible &&
                    <ListStyle style= {{ width: `${value.width}px` }} >
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
                    // infoBox && 
                    <InfoBoxStyle>
                        <MapInfoBox
                            record={infoBox.record}
                            entityName={infoBox.entityName}
                            entityIdentifierKey={infoBox.entityIdentifierKey}
                            entityIdentifierValue={infoBox.entityIdentifierValue}
                            onChangeSidebar={this.props.onChangeSidebar}
                            allFields={infoBox.allFields[infoBox.entityName]}
                            showInfoBox={this.showInfoBox}
                        />
                    </InfoBoxStyle>
                }

            </RootStyle>
            }

            </Motion>
            
        )
    }
}

export default MapBasic


const toolbarFragments = [
    {
        header:'All bins',
        filterName:'status',
        key:'bins',
        value:'all',
        icon:'circle',
        color:'inverted',
        type:'filter',
        children:[
            {
                header:'Empty bins (less than 30%)',
                type:'filter',
                filterName:'status',
                key:'bins',
                color:'green',
                value:'empty',
                icon:'circle',
            },
            {
                header:'Half bins (30-60%)',
                type:'filter',
                filterName:'status',
                key:'bins',
                color:'orange',
                value:'half',
                icon:'circle',
            },
            {
                header:'Full bins (more than 60%)',
                type:'filter',
                filterName:'status',
                key:'bins',
                color:'red',
                value:'full',
                icon:'circle',
            },
            {
                header:'Inactive bins',
                type:'filter',
                filterName:'status',
                key:'bins',
                color:'grey',
                value:'inactive',
                icon:'circle',
            },
            {
                header:'View List',
                type:'list',
                key:'bins',
                value:'view-list',
                icon:'list layout',
            },
        ]
    },
]

// status - empty, half, full, inactive,
const binsSeed = [
    {
        coordinates:[28.731188, 77.127796],
        status:'empty',
        binNumber:'bin34343',
        fill:'10%',
        binType:'bin'
    },
    {
        coordinates:[28.725909, 77.061754],
        status:'empty',
        binNumber:'bin97996',
        fill:'15%',
        binType:'bin'
    },
    {
        coordinates:[28.516222, 77.202781],
        status:'full',
        binNumber:'bin2323232',
        fill:'90%',
        binType:'bin'
    },
    {
        coordinates:[28.648536, 77.273403],
        status:'half',
        binNumber:'bin020223',
        fill:'50%',
        binType:'bin'
    },
    {
        coordinates:[28.648216, 77.271202],
        status:'full',
        binNumber:'bin2929232',
        fill:'85%',
        binType:'bin'
    },
    {
        coordinates:[28.658496, 77.450198],
        status:'half',
        binNumber:'bin3200699',
        fill:'40%',
        binType:'bin'
    },   
    {
        coordinates:[28.653396, 77.650198],
        status:'inactive',
        binNumber:'bin7833699',
        fill:'40%',
        binType:'bin'
    },   
]

