import React, {Component} from 'react'
import styled from 'styled-components'

const RootStyle = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
`
const HeaderStyle = styled.div`
    font-size:1.5em;
    height:50px;
    color: #33c;
    align-items:center;
    display:flex;
    justify-content:center;
    align-items:center;
    border-width:0 0 1px 0;
    border-style:solid;
    border-color:#cce;
    width:100%;
`

const Container = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
`

const NotifStyle = styled.div`
    min-height:40px;
    display:flex;
    align-items:center;
    font-size:1.2em;
    width:100%;
    padding:0px 50px;
    color: #111;
    cursor:pointer;
    &:hover{
        background-color:#eef;
    }
`

const NotificationsBox = (props) => {
    return(
        <RootStyle>
            <HeaderStyle>
                Recent Notifications
            </HeaderStyle>
            <Container>
                {
                    notifs.map((x,i)=>(
                        <NotifStyle key={i} >
                            {x.message}
                        </NotifStyle>
                    ))
                }
            </Container>
        </RootStyle>
    )
}

export default NotificationsBox

const notifs = [
    {
        message:"Gulshan created the app waste management one."
    },
    {
        message:"The bin23934 joined the application."
    },
    {
        message:"Gulshan updated the tags of the project."
    },
    {
        message:"Gulshan has added paul to the project."
    },
    {
        message:"Gulshan has added device9348384384 to the project."
    },
    {
        message:"Gulshan has added device93488454 to the project."
    },
    {
        message:"Paul joined the app waste management one."
    },
    
    
]