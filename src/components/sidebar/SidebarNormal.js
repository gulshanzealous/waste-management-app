
import React from 'react'
import styled, {css} from 'styled-components'
import ListHeader from './ListHeader'
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
        isShowSubmenu:true
    }

    componentDidMount = () => {
        
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
        const {activeMenuKey, isShowSubmenu} = this.state
        if(!visible){
            return null
        }
        return(
            <RootStyle>
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
        )
        
    }
}

export default SidebarNormal 