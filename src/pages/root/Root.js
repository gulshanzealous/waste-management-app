
import React from 'react'
import styled, { css } from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import {
    Dashboard, MapBasic
} from '../../pages'
import {
    SidebarNormal
} from '../../components'

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
            compressed:true,
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
                        <Route path='/dashboard' component={Dashboard} />
                        <Route 
                            path='/map-view' 
                            render={(props)=>{
                                return <MapBasic {...props} 
                                        onChangeSidebar={this.onChangeSidebar} 
                                    />
                            }}
                        />
                    </Switch>
                </MainAppStyle>
            </RootStyle>
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
        header:'Vehicles',
        key:'vehicles',
        path:'/vehicles/vehicle-list',
        icon:'truck',
        children:[
            {
                header:'Vehicle List',
                key:'vehicle-list',
                icon:'list layout',
                path:'/vehicle-list'
            },
            // {
            //     header:'Vehicle-map',
            //     key:'vehicle-map',
            //     path:'/vehicle-map'
            // },
            
        ]
    },
    {
        header:'Trips',
        key:'trips',
        path:'/trips/all-trips',
        icon:'travel',
        children:[
            {
                header:'All Trips',
                key:'all-trips',
                icon:'tasks',
                path:'/all-trips'
            },
        ]
    },
    {
        header:'Reports',
        key:'reports',
        path:'/reports/all-reports',
        icon:'folder open outline',
        children:[
            {
                header:'All Reports',
                key:'all-reports',
                icon:'file outline',
                path:'/all-reports'
            },
            {
                header:'Fuel Reports',
                key:'fuel-reports',
                icon:'fire',
                path:'/fuel-reports'
            },
            {
                header:'Overspeed Reports',
                key:'overspeed-reports',
                icon:'fighter jet',
                path:'/overspeed-reports'
            },
            // {
            //     header:'Fuel Reports',
            //     key:'fuel-reports',
            //     path:'/fuel-reports'
            // },
        ]
    },
    {
        header:'Reminders',
        key:'reminders',
        path:'/reminders/rem-all',
        icon:"bell",
        children:[
            {
                header:'All reminders',
                key:'all-reminders',
                icon:'bullseye',
                path:'/all-reminders'
            },
            
        ]
    },
    
]