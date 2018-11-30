import React from 'react'
import { PieChart, Pie, Sector, Cell, Tooltip, Legend } from "recharts";
import styled from 'styled-components'

const COLORS = ['#0088FE', '#FFBB28' , '#FF8042', '#999'];

const RADIAN = Math.PI / 180;                    

const RootStyle = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;
    cursor:pointer;
`

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.8;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
    <text fill={COLORS[index]} x={x} y={y}
       textAnchor={x > cx ? 'start' : 'end'} 
       dominantBaseline="central"
       style={{fontFamily:"Questrial"}}
    >
        {`${(percent * 100).toFixed(0)}%`}
   </text>
 );
};


const SimplePieChart = ({bins}) => {
    if(!bins || !bins.length){
        return <span></span>
    }

    // const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
    // {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];

    const data = Object.values(bins
        .reduce((f,x)=>{
            f[x.status] ? ++f[x.status].count : f[x.status]
            return f
        },{
            empty:{label:"Less than 30%",count:0,color:"#0088FE"},
            full:{label:"Between 30% and 60%",count:0, color:"#FFBB28"},
            half:{label:"More than 60%",count:0, color:"#FF8042"},
            inactive:{label:"Inactive",count:0, color:"#999"},
        }))
        .map(x => {
            return {
                name:x.label,
                value:x.count,
                color:x.color
            }
        })
    console.log(data)
  	return (
        <RootStyle>
            <PieChart width={350} height={300} 
                //onMouseEnter={this.onPieEnter}
            >
            <Pie
                data={data} 
                cx={170} 
                cy={160}
                startAngle={180}
                endAngle={0}
                innerRadius={80}
                outerRadius={120} 
                label={renderCustomizedLabel}
                style={{fontFamily:"Questrial"}}
                // label
                fill="#8884d8"
                paddingAngle={5}
                >
                {
                    data.map((entry, index) => <Cell fill={entry.color} key={index} />)
                }
            </Pie>
            <Tooltip />
            <Legend wrapperStyle={{fontFamily:"Questrial", fontSize:'1.1em'}} />
        </PieChart>
      </RootStyle>
    );
}


export default SimplePieChart