
import React from 'react'
import styled, { css } from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import {
    Dashboard, MapBasic, BinList
} from '../../pages'
import {
    SidebarNormal, Menubar
} from '../../components'

const ContainerBoxStyle = styled.div`
`

const RootStyle = styled.div`
    width:100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 250px 7fr;
    grid-template-rows: 0px 1fr;
    grid-column-gap: 5px;
    font-family: 'Cabin', sans-serif;
    

    ${props => props.compressed && css`
        grid-template-columns: 70px 7fr;
    `}
    ${props => !props.visible && css`
        grid-template-columns: 0px 7fr;
        grid-column-gap:0px;
    `}
`
const SidebarStyle = styled.div`
    grid-row:2/3;
    grid-column:1/2;
    z-index:100;
    background-color:#EBEAE3;

`
const MainAppStyle = styled.div`
    grid-column:2/3;
    background-color:#fff;
    grid-row:2/3;
`

class Root extends React.Component {

    state = {
        sidebarProps:{
            visible:true,
            compressed:false,
            fragments:[...sidebarFragments]
        }
    }

    componentDidMount = () => {

    }

    onChangeSidebar = ({ visible=true, compressed=false }) => {
        this.setState({
            sidebarProps:{
                ...this.state.sidebarProps,
                visible,
                compressed,
            }
        })
    }

    render(){
        const { visible, compressed, fragments } = this.state.sidebarProps

        return(
            <ContainerBoxStyle>
            {/* <Menubar /> */}
            <RootStyle compressed={compressed} visible={visible} >
                <SidebarStyle>
                    <SidebarNormal
                        visible={visible}
                        compressed={compressed}
                        fragments={fragments}
                        onChangeSidebar={this.onChangeSidebar}
                    />
                </SidebarStyle>
                <MainAppStyle>
                    <Switch>
                        <Route path='/' 
                            exact
                            render={(props)=>{
                                return <Dashboard {...props} 
                                        allData={{
                                            bins:binsSeed
                                        }} 
                                    />
                            }}
                         />
                         <Route path='/dashboard' 
                            render={(props)=>{
                                return <Dashboard {...props} 
                                        allData={{
                                            bins:binsSeed
                                        }} 
                                    />
                            }}
                         />
                        <Route 
                            path='/map-view' 
                            render={(props)=>{
                                return <MapBasic {...props} 
                                        onChangeSidebar={this.onChangeSidebar}
                                        binsSeed={binsSeed} 
                                    />
                            }}
                        />
                        <Route path='/bins/bin-list'
                            render={(props)=>{
                                return <BinList {...props} 
                                        allData={{
                                            bins:binsSeed
                                        }} 
                                    />
                            }} 
                        />
                    </Switch>
                </MainAppStyle>
            </RootStyle>
            </ContainerBoxStyle>

        )
    }
}

export default Root

const sidebarFragments = [
    {
        header:'Dashboard',
        key:'dashboard',
        path:'/dashboard',
        icon:'dashboard',
        children:[]
    },
    {
        header:'Map View',
        key:'map-view',
        path:'/map-view',
        icon:'map',
        children:[]
    },
    {
        header:"Bins' List ",
        key:'bins',
        path:'/bins/bin-list',
        icon:'trash',
        children:[
            // {
            //     header:'Vehicle List',
            //     key:'vehicle-list',
            //     icon:'list layout',
            //     path:'/vehicles/vehicle-list'
            // },
            // {
            //     header:'Vehicle-map',
            //     key:'vehicle-map',
            //     path:'/vehicle-map'
            // },
            
        ]
    },
    // {
    //     header:'Vehicles',
    //     key:'vehicles',
    //     path:'/vehicles/vehicle-list',
    //     icon:'truck',
    //     children:[
    //         {
    //             header:'Vehicle List',
    //             key:'vehicle-list',
    //             icon:'list layout',
    //             path:'/vehicles/vehicle-list'
    //         },
    //         // {
    //         //     header:'Vehicle-map',
    //         //     key:'vehicle-map',
    //         //     path:'/vehicle-map'
    //         // },
            
    //     ]
    // },
    // {
    //     header:'Trips',
    //     key:'trips',
    //     path:'/trips/all-trips',
    //     icon:'travel',
    //     children:[
    //         {
    //             header:'All Trips',
    //             key:'all-trips',
    //             icon:'tasks',
    //             path:'/all-trips'
    //         },
    //     ]
    // },
    // {
    //     header:'Reports',
    //     key:'reports',
    //     path:'/reports/all-reports',
    //     icon:'folder open outline',
    //     children:[
    //         {
    //             header:'All Reports',
    //             key:'all-reports',
    //             icon:'file outline',
    //             path:'/all-reports'
    //         },
    //         {
    //             header:'Fuel Reports',
    //             key:'fuel-reports',
    //             icon:'fire',
    //             path:'/fuel-reports'
    //         },
    //         {
    //             header:'Overspeed Reports',
    //             key:'overspeed-reports',
    //             icon:'fighter jet',
    //             path:'/overspeed-reports'
    //         },
    //         // {
    //         //     header:'Fuel Reports',
    //         //     key:'fuel-reports',
    //         //     path:'/fuel-reports'
    //         // },
    //     ]
    // },
    // {
    //     header:'Reminders',
    //     key:'reminders',
    //     path:'/reminders/rem-all',
    //     icon:"bell",
    //     children:[
    //         {
    //             header:'All reminders',
    //             key:'all-reminders',
    //             icon:'bullseye',
    //             path:'/all-reminders'
    //         },
            
    //     ]
    // },
    
]


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
