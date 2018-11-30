import React, {Component} from 'react'
import styled from 'styled-components'

const RootStyle = styled.div`
    width:100%;
    height:100%;
`


const myComponent = (props) => {
    return(
        <RootStyle>
            hello
        </RootStyle>
    )
}

export default myComponent
