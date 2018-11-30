
import React from 'react'
import styled, {css} from 'styled-components'
import {withRouter} from 'react-router-dom'
import ToolHeader from './ToolHeader'
import {Icon} from 'semantic-ui-react'
import { Transition } from 'react-transition-group'


const RootStyle = styled.div`
    width:0%;
    opacity:0;
    height:100%;
    background-color: #0E2F4E;
    display:flex;
    flex-flow:column nowrap;
    justify-content:flex-start;
    align-items:center;
    color:#fff;
    font-size:1.05em;

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


const ArrowStyle = styled.div`
    position:absolute;
    bottom:20px;
    color:#fff;
    left:25%;
    color:#fff;
    ${props => props.isToolbarExpanded && css`
        left:10%;
    `}
`



class SidebarNormal extends React.Component {

    state = {
        activeMenuKey:'bins',
        isShowSubmenu:true,
        startAnimation:null

    }

    componentDidMount = () => {
        this.setState({
            startAnimation: true
        })
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

    onToggleBar = () => {
        this.props.toggleExpandedToolbar()
    }

    render(){
        const { isToolbarExpanded, toolbarFragments, setFilter, setAction, setToggle, setList }  = this.props

        const {activeMenuKey, isShowSubmenu,startAnimation} = this.state

        return(

            <Transition in={startAnimation} timeout={0}>
            {(state)=> (
            <RootStyle style={{ ...defaultStyle, ...transitionStyle[state] }} >
                {
                    toolbarFragments.map((x,i) => (
                        <HeaderStyle key={i} >
                            <ToolHeader 
                                fields={x}
                                isToolbarExpanded={isToolbarExpanded}
                                onChangeActiveMenu={this.onChangeActiveMenu}
                                isActive={x.key === activeMenuKey}
                                isSubMenu={false}
                                isShowSubmenu={isShowSubmenu}
                                onToggleSubmenu={this.onToggleSubmenu}
                                setFilter={setFilter}
                                setAction={setAction}
                                setToggle={setToggle}
                                setList={setList}
                            />
                            {
                                !!(x.key === activeMenuKey) && !!x.children.length && isShowSubmenu && 
                                x.children.map((y,j) => (
                                    <ToolHeader 
                                        fields={y}
                                        key={j}
                                        parentKey={x.key}
                                        isToolbarExpanded={isToolbarExpanded}
                                        onChangeActiveMenu={this.onChangeActiveMenu}
                                        isSubMenu={true}
                                        setFilter={setFilter}
                                        setAction={setAction}
                                        setToggle={setToggle}
                                        setList={setList}
                                    />
                                ))
                            }
                        </HeaderStyle>
                        )
                    )
                }
                

                
                <ArrowStyle onClick={this.onToggleBar} isToolbarExpanded={isToolbarExpanded} >
                    <Icon name= {`${isToolbarExpanded? 'chevron right': 'chevron left' }`} size='large'  />
                </ArrowStyle>
            </RootStyle>
            )}
            </Transition>
        )
        
    }
}

export default withRouter(SidebarNormal) 