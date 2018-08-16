
import React from 'react'
import styled, {css} from 'styled-components'
import {withRouter, Link} from 'react-router-dom'
import {Icon} from 'semantic-ui-react'
import {Motion, spring} from 'react-motion';
import ReactTooltip from 'react-tooltip'


const RootStyle = styled.div`
    width:100%;
    height:45px;
    display: flex;
    align-items:center;
    cursor:pointer;
    background-color: #0E2F4E;
    border-color:#0E2F4E;
    border-width:0px 0px 0px 5px;
    border-style:solid;

    ${props => props.isActive && css`
        background-color: #074375;
        border-color:#09baf4;
    `}
    ${props => props.isSubMenu && css`
        height:45px;
        background-color: #074375;
        border-color:#09baf4;
    `}

    ${props => props.isSubMenu && css`
        &:hover{
            background-color:#0E2F4E;
        }
    `}

    ${props => props.isSubMenu && props.isToolbarExpanded && css`
        height:45px;
        background-color: #074375;
        padding-left:0px;
        border-color:#09baf4;
    `}

`

const IconStyle = styled.div`
    padding-left:15px;
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
    font-size:1em;
    color:#ddd;

    ${props => props.isActive && css`
        color: white;
    `}
    ${props => props.isSubMenu && css`
        font-size:1em;
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

class ToolHeader extends React.Component {


    onClickMenu = (e) => {
        e.preventDefault()
        // console.log(this.props.value.key)
        const { isSubMenu, parentKey, fields } = this.props
        const key = isSubMenu ? parentKey : fields.key
        this.props.onChangeActiveMenu(key)

        if(fields.type==='filter'){
            return this.props.setFilter({
                filterKey: fields.filterName,
                filterValue: fields.value,
                entity: fields.key
            })
        }
        if(fields.type === 'toggle'){
            return this.props.setToggle({
                toggleKey: fields.key
            })
        }

        if(fields.type==='list'){
            return this.props.setList({
                listKey: fields.key
            })
        }

        this.props.setAction({
            actionKey: fields.key,
            actionValue: fields.value
        })
        
        // this.props.history.push(this.props.value.path)
    }

    onToggleSubmenu = () => {
        this.props.onToggleSubmenu()
    }

    render(){
        const { fields, isToolbarExpanded, isActive, isSubMenu, isShowSubmenu } = this.props
        const { header,path,icon, children, color } = fields
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
                    <RootStyle isActive={isActive} isSubMenu={isSubMenu} 
                        isToolbarExpanded={!isToolbarExpanded} style={toCSSZoom(value.scale)} 
                        data-tip={`${header}`}
                    >
                        <IconStyle isActive={isActive}  isSubMenu={isSubMenu} >
                            <Icon name={icon} size='large'
                            color={color!=='inverted' ? color : null }
                            inverted={color==='inverted'}
                        />
                        </IconStyle>
                        {   isToolbarExpanded &&
                            <HeaderStyle isActive={isActive} isSubMenu={isSubMenu}  >
                                {header}
                            </HeaderStyle>
                        }
                        {
                            isToolbarExpanded && !isSubMenu && !!children.length ?
                            <ArrowStyle isActive={isActive} onClick={this.onToggleSubmenu} >
                                <Icon 
                                    name= {`${isActive && isShowSubmenu? 'close': 'add' }`} 
                                    size='small' 
                                />
                            </ArrowStyle>
                            :
                            <ArrowStyle/>
                        }

                    </RootStyle>
                    <ReactTooltip 
                        place='left'
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

export default withRouter(ToolHeader)