import React from 'react'
import styled from 'styled-components'
import GeneralStatsBox from './GeneralStatsBox'
import BinStatusBox from './BinStatusBox'
import SystemCapacityBox from './SystemCapacityBox'
import NotificationsBox from './NotificationsBox'
import ScheduleNextStatsBox from './ScheduleNextStatsBox'
import ScheduleLastStatsBox from './ScheduleLastStatsBox'
import SystemCapacityGraph from './SystemCapacityGraph'

const RootStyle = styled.div`
    width:100%;
    height:100%;
    background-color:#FAFAFA;
`

const ContainerStyle = styled.div`
    width:100%;
    padding:10px 20px 10px 10px;
    display:flex;
    flex-flow:row wrap;
    /* overflow-x:scroll; */
    overflow-y:scroll;
`

const DashBoxStyle = styled.div.attrs({  
    height: props => props.height || '400px',
    width: props => props.width || 'auto',
  })
`
    height: ${props => props.height};
    min-width: ${props => props.width};
    box-shadow: ${props => props.hideShadow? "none": "0px 2px 10px 1px rgba(170,170,170,0.5)" };
    background-color:#fff;
    border-radius:4px;
    margin:12px 10px;
    max-width:500px;
    transition:all 500ms;
    
    &:hover{
        box-shadow: ${props => props.hideShadow? "none": "2px 5px 10px 1px rgba(170,170,170,1)" };
    }
`;


class Root extends React.Component {

    state = {
        allData:[]
    }

    componentDidMount = () => {
        this.setState({
            allData: this.props.allData
        })
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props !== nextProps){
            // this.setState({

            // })
        }
    }

    render(){
        const bins = this.state.allData.bins
        return(
            <RootStyle>

                <ContainerStyle>
                    <DashBoxStyle height={'400px'} width={'400px'} hideShadow >
                        <GeneralStatsBox bins={bins} />
                    </DashBoxStyle>

                    <DashBoxStyle height={'400px'} width={'450px'} >
                        <BinStatusBox bins={bins} />
                    </DashBoxStyle>

                    <DashBoxStyle height={'400px'} width={'400px'} >
                        <ScheduleNextStatsBox />
                    </DashBoxStyle>

                    <DashBoxStyle height={'400px'} width={'400px'} >
                        <SystemCapacityBox bins={bins} />
                    </DashBoxStyle>

                    <DashBoxStyle height={'400px'} width={'600px'} >
                        <SystemCapacityGraph />
                    </DashBoxStyle>


                    <DashBoxStyle height={'400px'} width={'400px'} >
                        <ScheduleLastStatsBox />
                    </DashBoxStyle>

                    <DashBoxStyle height={'400px'} width={'500px'} >
                        <NotificationsBox />
                    </DashBoxStyle>


                    {/* <DashBoxStyle height={'400px'} width={'600px'} >
                    </DashBoxStyle>

                    <DashBoxStyle height={'400px'} width={'400px'} >
                    </DashBoxStyle>

                    <DashBoxStyle height={'400px'} width={'200px'} >
                    </DashBoxStyle> */}

    
                </ContainerStyle>
            </RootStyle>
        )
    }
}

export default Root