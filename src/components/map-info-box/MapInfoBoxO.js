import React from 'react'
import styled, {css} from 'styled-components'
import {Motion, spring} from 'react-motion';


const RootStyle = styled.div`
    width:0px;
    height:100%;
    transition:width 1s;
    /* ${props => props.expand && css`
        width:350px;
    `} */
`

const ContainerStyle = styled.div`
    width:0%;
    height:100%;
    background-color:#F5F5F5;
    z-index:-1;
    box-shadow: 4px 0px 10px 1px rgba(170,170,170,0.5);
    transition:width 1s;
    /* ${props => props.expand && css`
        width:100%;
    `} */
`

class MapInfoBox extends React.Component {



    state = {
        expand:false
    }

    componentDidMount = () => {
        this.setState({ expand:true })
        this.props.onChangeSidebar({ compressed:true })
    }

    componentWillUnmount = () => {
        this.props.onChangeSidebar({ compressed:false })
    }

    render(){
        const {expand} = this.state
        // console.log(expand)
        const config = {stiffness:3000, damping:60}
        const toCSSZoom = (width) => ({ width: `${width}` })

        return(
            <Motion
                defaultStyle={{ width:0 }}
                style={{width: spring(350, config) }}
            >
            {
                value => {
                    console.log(value)
                return(
                <RootStyle expand={expand}  >
                    <ContainerStyle expand={expand} style={value} >
                        hello
                        world
                        this 
                        is 
                    </ContainerStyle>
                </RootStyle>
                )
                }
            }
            </Motion>
        )
    }
}

export default MapInfoBox