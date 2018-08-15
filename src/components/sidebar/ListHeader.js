
import React from 'react'
import styled, {css} from 'styled-components'
import {withRouter, Link} from 'react-router-dom'
import {Icon} from 'semantic-ui-react'
import {Motion, spring} from 'react-motion';
import ReactTooltip from 'react-tooltip'


const RootStyle = styled.div`
    width:100%;
    height:60px;
    display: flex;
    align-items:center;
    cursor:pointer;
    background-color: #0E2F4E;
    border-color:#0E2F4E;
    border-width:0px 0px 0px 5px;
    border-style:solid;

    ${props => props.isActive && css`
        background-color: #0f68bc;
        border-color:#09baf4;
    `}
    ${props => props.isSubMenu && css`
        height:60px;
        /* background-color: #0f68bc; */
        padding-left:5px;
        border-color:#09baf4;
    `}

    ${props => props.isSubMenu && css`
        &:hover{
            background-color:#074375;
        }
    `}

    

    ${props => props.isSubMenu && props.compressed && css`
        height:60px;
        background-color: #0f68bc;
        padding-left:0px;
        border-color:#09baf4;
    `}

`

const IconStyle = styled.div`
    padding-left:20px;
    flex:1 1 0%;
    color:#ddd;

    ${props => props.isActive && css`
        color: white;
    `}
    ${props => props.isSubMenu && css`
        color:#aaa;
    `}

    &:hover{
        color:white
    }
`

const HeaderStyle = styled.div`
    flex:3 3 0%;
    color:#fff;
    font-size:1.2em;
    color:#ddd;

    ${props => props.isActive && css`
        color: white;
    `}
    ${props => props.isSubMenu && css`
        font-size:1.1em;
    `}

    &:hover{
        color:white
    }
`
const ArrowStyle = styled.div`
    flex:0 0 50px;
    color:#ddd;
    padding:10px;
    ${props => props.isActive && css`
        color: white;
    `}

`

class ListHeader extends React.Component {


    onClickMenu = (e) => {
        e.preventDefault()
        // console.log(this.props.value.key)
        const key = this.props.isSubMenu ? this.props.parentKey : this.props.value.key
        this.props.onChangeActiveMenu(key)
        this.props.history.push(this.props.value.path)
    }

    onToggleSubmenu = () => {
        this.props.onToggleSubmenu()
    }

    render(){
        const { value, compressed, isActive, isSubMenu, isShowSubmenu } = this.props
        const { header,path,icon, children } = value
        const config = {stiffness:150, damping:20}

        const toCSSZoom = (scale) => ({ transform: `scale(1, ${scale})` })

        // console.log(header)
        return(
            <Motion  
                defaultStyle={{scale: 0 }} 
                style={{scale: spring(1, config )}}
            >
            {
                value => 

                <Link to={`${path}`} onClick={this.onClickMenu}  >
                    <RootStyle isActive={isActive} isSubMenu={isSubMenu} compressed={compressed} 
                        style={toCSSZoom(value.scale)}
                        data-tip={`${header}`} 
                    >
                        <IconStyle isActive={isActive}  isSubMenu={isSubMenu}  >
                            <Icon name={icon} size='large'   />
                        </IconStyle>
                        {   !compressed &&
                            <HeaderStyle isActive={isActive} isSubMenu={isSubMenu}  >
                                {header}
                            </HeaderStyle>
                        }
                        {
                            !compressed && !isSubMenu && !!children.length ?
                            <ArrowStyle isActive={isActive} onClick={this.onToggleSubmenu} >
                                <Icon name= {`${isActive && isShowSubmenu? 'chevron up': 'chevron down' }`} size='small' />
                            </ArrowStyle>
                            :
                            <ArrowStyle/>
                        }

                    </RootStyle>
                    <ReactTooltip 
                        place='right'
                        type='info'
                        effect='solid'
                        delayShow={200}
                    />
                </Link>
            
            }
            
            </Motion>

        )
    }
}

export default withRouter(ListHeader)