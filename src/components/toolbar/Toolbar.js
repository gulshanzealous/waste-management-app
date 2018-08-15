
import React from 'react'
import styled, {css} from 'styled-components'
import {withRouter} from 'react-router-dom'
import ToolHeader from './ToolHeader'
import {Icon} from 'semantic-ui-react'

const RootStyle = styled.div`
    width:100%;
    height:100%;
    background-color: #0E2F4E;
    display:flex;
    flex-flow:column nowrap;
    justify-content:flex-start;
    align-items:center;
`
const HeaderStyle = styled.div`
    width:100%;
`


const ArrowStyle = styled.div`
    position:absolute;
    bottom:20px;
    color:#fff;
    left:25%;
    ${props => props.isToolbarExpanded && css`
        left:10%;
    `}
`



class SidebarNormal extends React.Component {

    state = {
        activeMenuKey:'status',
        isShowSubmenu:true
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
        const { isToolbarExpanded, toolbarFragments, setFilter, setAction }  = this.props

        const {activeMenuKey, isShowSubmenu} = this.state

        return(
            <RootStyle>
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
                                    />
                                ))
                            }
                        </HeaderStyle>
                        )
                    )
                }
                

                
                <ArrowStyle onClick={this.onToggleBar} isToolbarExpanded={isToolbarExpanded} >
                    <Icon name= {`${isToolbarExpanded? 'chevron right': 'chevron left' }`} size='large' color='white' />
                </ArrowStyle>
            </RootStyle>
        )
        
    }
}

export default withRouter(SidebarNormal) 