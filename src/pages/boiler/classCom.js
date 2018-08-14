import React from 'react'
import styled from 'styled-components'

const RootStyle = styled.div`
    width:100%;
    height:100%;
`

class Root extends React.Component {

    state = {

    }

    componentDidMount = () => {

    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props !== nextProps){
            this.setState({

            })
        }
    }

    render(){
        return(
            <RootStyle>
                hello
            </RootStyle>
        )
    }
}

export default Root