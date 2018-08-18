import React from 'react'
import styled from 'styled-components'

const RootStyle = styled.div`
    width:100%;
    height:100%;
    background-color:#FAFAFA;
`

const ContainerStyle = styled.div`
    width:100%;
    height:1500px;
    padding:10px 20px 10px 10px;
    display:flex;
    flex-flow:column wrap;
    overflow-x:scroll;
    overflow-y:scroll;
`

const DashBoxStyle = styled.div.attrs({  
    height: props => props.height || '400px',
  })`
    height: ${props => props.height};
    box-shadow: 0px 2px 10px 1px rgba(170,170,170,0.5);
    background-color:#fff;
    min-width:300px;
    border-radius:4px;
    margin:12px 10px;
    transition:all 500ms;
    
    &:hover{
        box-shadow: 2px 5px 10px 1px rgba(170,170,170,1);
    }
`;
  

class Root extends React.Component {

    state = {

    }

    componentDidMount = () => {

    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props !== nextProps){
            // this.setState({

            // })
        }
    }

    render(){
        return(
            <RootStyle>
                <ContainerStyle>

                    <DashBoxStyle height={'300px'} >
                    </DashBoxStyle>

                    <DashBoxStyle height={'250px'} >
                    </DashBoxStyle>

                    <DashBoxStyle height={'350px'} >
                    </DashBoxStyle>

                    <DashBoxStyle height={'300px'} >
                    </DashBoxStyle>

                    <DashBoxStyle height={'350px'} >
                    </DashBoxStyle>

                    <DashBoxStyle height={'350px'} >
                    </DashBoxStyle>

                    <DashBoxStyle height={'400px'} >
                    </DashBoxStyle>

                    <DashBoxStyle height={'600px'} >
                    </DashBoxStyle>

                    <DashBoxStyle height={'400px'} >
                    </DashBoxStyle>

                    <DashBoxStyle height={'200px'} >
                    </DashBoxStyle>

    
                </ContainerStyle>
            </RootStyle>
        )
    }
}

export default Root