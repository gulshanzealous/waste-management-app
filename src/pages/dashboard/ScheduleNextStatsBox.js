import React, { Component } from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const RootStyle = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-flow:column nowrap;

`

const ScheduleStyle = styled.div`
    flex:1 1 0%;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;
    border-width:1px;
    border-style:solid;
    border-color:#dde;
`

const Header = styled.div`
    flex:0 0 40px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:1.5em;
    color: #33c;
`
const Pair = styled.div`
    display:flex;
    width:100%;
    padding:0 50px;
`
const Field = styled.div`
    color: #55f;
    font-size:1.2em;
`
const Value = styled.div`
    font-size:1.2em;
    margin:0 0 0 15px;
    color: #111;
`

const StatsBox = ({ bins }) => {
    const scheduleStats = [
        {
            key: "Next Pickup Details",
            time: "9 a.m. on 15th Nov 2018",
            message: "Expected Capacity increase to 87%.",
            vehicle: "DL11SH6952",
            driverName: "Anil",
            driverContact: "9939394566",
            color: ""
        },
        // {
        //     key: "Last Pickup Time",
        //     time: "9 a.m. on 1st Nov 2018",
        //     message: "Capacity increased to 85%.",
        //     vehicle: "DL11SH6952",
        //     driverName: "Suresh",
        //     driverContact: "9939394566",
        //     color: ""
        // },

    ]

    return (
            <RootStyle>

                {
                    scheduleStats.map((x, i) => (
                        <ScheduleStyle key={i} >
                            <Header>
                                {x.key}
                            </Header>
                            <Pair>
                                <Field>Pickup Time</Field>
                                <Value>{x.time}</Value>
                            </Pair>
                            <Pair>
                                <Field>Pickup Time</Field>
                                <Value>{x.time}</Value>
                            </Pair>
                            <Pair>
                                <Field>Outcome</Field>
                                <Value>{x.message}</Value>
                            </Pair>
                            <Pair>
                                <Field>Vehicle Number</Field>
                                <Value>{x.vehicle}</Value>
                            </Pair>
                            <Pair>
                                <Field>Driver Name</Field>
                                <Value>{x.driverName}</Value>
                            </Pair>
                            <Pair>
                                <Field>Driver Contact</Field>
                                <Value>{x.driverContact}</Value>
                            </Pair>
                            
                        </ScheduleStyle>
                    ))
                }


            </RootStyle>
    )
}

export default StatsBox
