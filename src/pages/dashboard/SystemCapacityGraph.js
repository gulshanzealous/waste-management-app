import React from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";
import styled from 'styled-components'

const data = [
      {name: '1Nov', uv: 4000, pv: 10, amt: 2400},
      {name: '2Nov', uv: 3000, pv: 15, amt: 2210},
      {name: '3Nov', uv: 2000, pv: 27, amt: 2290},
      {name: '4Nov', uv: 2780, pv: 59, amt: 2000},
      {name: '5Nov', uv: 1890, pv: 75, amt: 2181},
      {name: '6Nov', uv: 2390, pv: 32, amt: 2500},
      {name: '7Nov', uv: 3490, pv: 20, amt: 2100},
];

const RootStyle = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;
    cursor:pointer;
`

const Header = styled.div`
    height: 40px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:1.5em;
    color: #33c;
`

const SimpleLineChart = () => {
  	return (
        <RootStyle>
            <Header>
                {'System Capacity Metrics'}
            </Header>
            <LineChart width={600} height={300} data={data}
                margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip wrapperStyle={{fontFamily:"Questrial", fontSize:'1em'}} />
                    {/* <Legend wrapperStyle={{fontFamily:"Questrial", fontSize:'1.1em', marginTop:'60px'}} /> */}
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
      </RootStyle>
    )
}


export default SimpleLineChart