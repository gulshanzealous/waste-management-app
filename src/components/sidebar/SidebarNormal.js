
import React from 'react'
import styled, {css} from 'styled-components'
import {withRouter} from 'react-router-dom'
import ListHeader from './ListHeader'
import {Icon} from 'semantic-ui-react'
import { Transition } from 'react-transition-group'
const uuid = require('uuid/v1')

const RootStyle = styled.div`
    width:0%;
    opacity:0;
    height:100%;
    background-color: #0E2F4E;
    display:flex;
    flex-flow:column nowrap;
    justify-content:flex-start;
    align-items:center;
    z-index:100;
    box-shadow: 2px 5px 10px 1px rgba(170,170,170,1);

`
const defaultStyle = {
    width:'0%',
    opacity:0,
    transition: `width 400ms ease-in-out`,

}

const transitionStyle = {
    entering:{
        width:'0%',
        opacity:0
    },
    entered:{
        width:'100%',
        opacity:1,
    }
}

const HeaderStyle = styled.div`
    width:100%;
`

const IconStyle = styled.div`
    color:white;
    position:absolute;
    top:95%;
    left:200px;
    cursor:pointer;
    width:20px;
    height:20px;
    ${props => props.compressed && css`
        left: 30px;
    `}

`


class SidebarNormal extends React.Component {

    state = {
        activeMenuKey:'dashboard',
        isShowSubmenu:true,
        startAnimation:null
    }

    componentDidMount = () => {
        const path =  this.props.location.pathname
        const menuActive = this.props.fragments.filter(x => x.path === path)
        this.setState({
            activeMenuKey: menuActive[0] && menuActive[0].key,
            startAnimation: true
        })
    }



    onChangeSidebar = () => {
        this.props.onChangeSidebar({ compressed: !this.props.compressed })
    }

    onChangeActiveMenu = (menuKey) => {
        if(this.state.activeMenuKey !== menuKey){
            this.setState({
                activeMenuKey:menuKey
            })
        }
    }

    onToggleSubmenu = () => {
        this.setState({
            isShowSubmenu: !this.state.isShowSubmenu
        })
    }

    render(){
        const { visible, compressed, fragments } = this.props
        const {activeMenuKey, isShowSubmenu, startAnimation} = this.state
        if(!visible){
            return null
        }
        return(
            <Transition in={startAnimation} timeout={0}>
            {(state)=> (
                <RootStyle style={{ ...defaultStyle, ...transitionStyle[state] }} >
                {
                    fragments.map(x => (
                        <HeaderStyle key={x.key} >
                            <ListHeader 
                                value={x}
                                compressed={compressed}
                                onChangeActiveMenu={this.onChangeActiveMenu}
                                isActive={x.key === activeMenuKey}
                                isSubMenu={false}
                                isShowSubmenu={isShowSubmenu}
                                onToggleSubmenu={this.onToggleSubmenu}
                            />
                            {
                                !!(x.key === activeMenuKey) && !!x.children.length && isShowSubmenu && 
                                x.children.map(y => (
                                    <ListHeader 
                                        value={y}
                                        key={y.key}
                                        parentKey={x.key}
                                        compressed={compressed}
                                        onChangeActiveMenu={this.onChangeActiveMenu}
                                        isSubMenu={true}

                                    />
                                ))
                            }
                        </HeaderStyle>
                        )
                    )
                }
                

                <IconStyle onClick={this.onChangeSidebar} compressed={compressed} >
                    <Icon name= {`${compressed? 'chevron right': 'chevron left' }`} size='large' />
                </IconStyle>
            </RootStyle>
            )}
            
            </Transition>
        )
        
    }
}

export default withRouter(SidebarNormal) 