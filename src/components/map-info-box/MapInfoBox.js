import React from 'react'
import styled, {css} from 'styled-components'
import { Transition } from 'react-transition-group'
import {Icon} from 'semantic-ui-react'
// import './styles.css'

const RootStyle = styled.div`
    width:0px;
    height:100%;
`

const IconStyle = styled.div`
    position:absolute;
    top:5px;
    left:260px;
    cursor:pointer;
`

const defaultStyle = {
    transition: `width 400ms ease-out`,
    width: 0,
    height:'100%',
    backgroundColor:'#F5F5F5',
    zIndex:-1,
    boxShadow: "4px 0px 10px 1px rgba(170,170,170,0.5)",
    display:"flex",
    flexDirection:'column',
    padding:'30px 10px 20px 10px',
    justifyContent:'flex-start',
    alignItems:'center'
  }

  const transitionStyles = {
    entering: { width: '0px' },
    entered: { 
        width: '300px',
    },
    exiting: {
        width:'300px',
    },
    exited: { 
        width: '0px',
    },
};

const VehicleNumberStyle = styled.div`
    height:60px;
    width:250px;
    font-size:1.5em;
    background-color:#fff;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:6px;
    margin:10px 0px;
    box-shadow: 1px 2px 10px 1px rgba(170,170,170,0.5);
    color:#000;
`

const CoordinatesStyle = styled.div`
    height:120px;
    width:250px;
    background-color:#fff;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border-radius:6px;
    margin:10px 0px;
    box-shadow: 1px 2px 10px 1px rgba(170,170,170,0.5);
`
const CoordinatesKey = styled.div`
    height:50px;
    width:250px;
    border-radius:6px 6px 0px 0px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#ccc;
    color:#000;
    font-size:1.3em;
`
const CoordinatesValue = styled.div`
    height:35px;
    width:250px;
    border-radius:6px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:#000;
    font-size:1.3em;
`

const BlockStyle = styled.div`
    height:60px;
    width:250px;
    background-color:#fff;
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    align-items:center;
    border-radius:6px;
    margin:10px 0px;
    box-shadow: 1px 2px 10px 1px rgba(170,170,170,0.5);
`
const BoxKey = styled.div`
    flex:2 2 0%;
    height:60px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#ccc;
    color:#000;
    font-size:1.3em;
`
const BoxValue = styled.div`
    flex:3 3 0%;
    height:60px;
    padding:0px 5px;
    border-radius:6px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:#000;
    font-size:1.3em;
    word-wrap:break-word;
`

class MapInfoBox extends React.Component {

    componentDidMount = () => {
        if(!!this.props.record){
            this.props.onChangeSidebar({ compressed: true })
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.record !== this.props.record && nextProps.record){
            this.props.onChangeSidebar({ compressed: true })
        }
    }

    componentWillUnmount = () => {
        this.props.onChangeSidebar({ compressed:false })
    }

    hideInfo = () => {
        this.props.showInfoBox({
            entityName: null,
            entityIdentifierKey: null,
            entityIdentifierValue: null,
            infoBoxVisible:false
        })
    }

    render(){
        if(!!!this.props.record){
            return(
            <RootStyle  >
                <Transition in={!!this.props.record} timeout={0}>
                    <div/>
                </Transition>
            
            </RootStyle>
            )
        }

        const {record, allFields} = this.props
        const validArray = allFields.map(x => {
            let key = x
            let value = record[x]
            if(key === 'coordinates'){
                value = value.reduce((str,p,i)=>{
                    str += `${i===0? '' : ',  ' }` + p
                    return str
                },'')
            }

            key = capitalize(key).split(/(?=[A-Z])/).join(" ");
            value = capitalize(value)
            return { key, value }
        })
        return(
                <RootStyle  >

                    <Transition in={!!this.props.record} timeout={0}>
                        {(state) => (
                        <div style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}>
                            {
                                validArray.length &&
                                validArray.map((x,i)=>{
                                    if(x.key==='Vehicle Number'){
                                        return (
                                        <VehicleNumberStyle key={i} >
                                            {x.value}
                                        </VehicleNumberStyle>
                                        )
                                    }if(x.key==='Coordinates'){ 
                                        return (
                                        <CoordinatesStyle key={i} >
                                            <CoordinatesKey>
                                                {x.key}
                                            </CoordinatesKey>
                                            <CoordinatesValue>
                                                {x.value.split(',')[0]} ,
                                            </CoordinatesValue>
                                            <CoordinatesValue>
                                                {x.value.split(',')[1]} 
                                            </CoordinatesValue>
                                        </CoordinatesStyle>
                                        )
                                    }
                                    return (
                                        <BlockStyle key={i}>
                                            <BoxKey> {x.key} </BoxKey>
                                            <BoxValue> {x.value} </BoxValue>
                                        </BlockStyle>
                                    )
                                })

                            }
                            <IconStyle>
                                <Icon size='large' color='blue' name='close' onClick={this.hideInfo} />
                            </IconStyle>

                        </div>
                        )}
                    </Transition>

                </RootStyle>
        )
    }
}

export default MapInfoBox




function capitalize(str=''){
    return str.trim().split('')
          .map((char,i) => i === 0 ? char.toUpperCase() : char )
          .reduce((final,char)=> final += char, '' )
    }