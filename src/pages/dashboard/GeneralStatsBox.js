import React, {Component} from 'react'
import styled from 'styled-components'
import {Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const RootStyle = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-flow:row wrap;
    cursor:pointer;
    background-color:#FAFAFA;

`

const BlockOne = styled.div`
    flex:1 1 45%;
    height:45%;
    box-shadow: 0px 2px 10px 1px rgba(170,170,170,0.5);
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;
    border-width:1px;
    border-style:solid;
    border-color:#dde;
    margin:10px;

`

const CountStyle = styled.div`
    font-size:4em;
    color: #0E2F4E;
`
const LabelStyle = styled.div.attrs({
    color: props => props.color || 'green'
})`
    font-size:1.5em;
    color:${props => props.color};
`

const StatsBox = ({ bins }) => {
    let binCat = {
        'Bins Deployed': {
            count: bins ? bins.length : 0,
            color:'#55c'
        },
        'Bins Connected':{
            count:0,
            color:'green'
        },
        'Bins Inactive':{
            count:0,
            color:'#777'
        },
        'Low Battery':{
            count:0,
            color:'#e55'
        }
    }
    console.log(binCat)

    binCat = bins ?
        bins.length && bins.reduce((f,x)=>{
            if(x.battery && x.battery < 10){
                f['Low Battery'].count += 1 
                return f
            }
            if(x.status && x.status ==='inactive'){
                f['Bins Inactive'].count += 1 
                return f
            }
            return f
        },binCat)
        :
        binCat

    console.log(binCat)
    binCat['Bins Connected'].count = binCat['Bins Deployed'].count - binCat['Bins Inactive'].count

    // const catArr = Object.entries(binCat).reduce(x=>{

    // },[])

    return(
        <Link to='/bins/bin-list'>
            <RootStyle>

                {
                    Object.entries(binCat).map((x,i)=>(
                        <BlockOne key={i}>
                            <CountStyle> {x[1].count} </CountStyle>
                            <LabelStyle color={x[1].color} > 
                                <Icon name='trash alternate' size='large' />
                                <span> {x[0]} </span>
                            </LabelStyle>
                        </BlockOne>
                    ))
                }

                
            </RootStyle>
        </Link>
    )
}

export default StatsBox
