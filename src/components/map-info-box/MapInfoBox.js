import React from 'react'
import styled from 'styled-components'

const RootStyle = styled.div`
    width:100%;
    height:100%;
    min-width:300px;
    display:grid;
    grid-template-rows:1fr;
    grid-template-columns:1fr;
`

const Opaquer = styled.div`
    grid-row:1/2;
    grid-column:1/2;
    background-color:#EAE9E4;
    z-index:10;
    box-shadow: 7px 0px 5px 0px rgba(187,187,187,1);
    elevation:above;
`

const ContainerStyle = styled.div`
    grid-row:1/2;
    grid-column:1/2;
    color:#f00;
    z-index:20;
`

class MapInfoBox extends React.Component {

    state = {

    }

    render(){
        return(
            <RootStyle>
                <Opaquer>
                </Opaquer>
                <ContainerStyle>
                    hello
                    world
                    this 
                    is 
                </ContainerStyle>
            </RootStyle>
        )
    }
}

export default MapInfoBox