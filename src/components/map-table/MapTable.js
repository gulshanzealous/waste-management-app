import React from 'react'
import styled from 'styled-components'
import {Icon, Input} from 'semantic-ui-react'
import {Motion, spring} from 'react-motion';

const RootStyle = styled.div`
    width:100%;
    height:700px;
    border-radius:10px 0px 0px 10px;
    padding:5px 60px 0 0;
    display:flex;
    flex-flow: column nowrap;
    align-items:center;
`
const HeaderStyle = styled.div`
    flex:0 0 45px;
    width:100%;
    height:45px;
    display:flex;
    align-items:center;
    justify-content:space-around;
    border-width:0px 0px 1px 0px;
    border-style:solid;
    border-color:#777;
`
const BodyStyle = styled.div`
    flex: 1 1 0%;
    width:100%;
    overflow:scroll;
`

const HeadingStyle = styled.div`
    font-size:1.5em;
    text-transform:capitalize;
    color:#fff;
    height:100%;
    flex: 2 2 70%;
    display:flex;
    justify-content:center;
    align-items:center;
`
const SearchStyle = styled.div`
    height:100%;
    flex: 2 2 80%;
    display:flex;
    justify-content:space-between;
    align-items:center;
`

const SearchCloseIcon = styled.div`
    color:#fff;
    margin:0px 20px;
`

const InputStyle = styled.div`
    width:100%;
    padding:1px 5px 1px 5px;
`

const SearchIconStyle = styled.div`
    color:#fff;
    flex: 1 1 15%;
`
const CloseIconStyle = styled.div`
    color:#fff;
    flex: 1 1 15%;
`
const TableCellStyle = styled.div`
    width:100%;
    min-height:40px;
    padding:0px 20px;
    display:flex;
    align-items:center;
    justify-content:flex-start;

    &:hover{
        background-color:#074375;
    }
`
const TableTextStyle = styled.div`
    font-family: 'Roboto', sans-serif;
    color:#fff;
    text-transform:capitalize;
    font-size:1.05em;
`



class MapTable extends React.Component {

    state = {
        searchMode:false,
        searchString:''
    }

    onClickClose = () => {
        this.props.setList({ listKey: this.props.entity })
    }

    onClickSearch = () => {
        this.setState({
            searchMode: !this.state.searchMode
        })
    }

    onCancelSearch = () => {
        this.setState({
            searchMode: false,
            searchString:''
        })
    }
 
    onSelectCell = (x) => {
        const { vehicleNumber } = x
        this.props.setFilter({
            filterKey:'vehicleNumber',
            filterValue: vehicleNumber,
            entity: this.props.entity,
            fromTable:true
        })
        this.props.showInfoBox({
            entityName: this.props.entity,
            entityIdentifierKey: 'vehicleNumber',
            entityIdentifierValue: vehicleNumber
        })
    }

    onChangeSearch = (e) => {
        console.log(e.target.value)
        this.setState({
            searchString: e.target.value && e.target.value.toLowerCase()
        })
    }

    render(){
        const {searchMode, searchString} = this.state
        const { staticData, fields, entity, setList } = this.props
        const data = [...staticData,...staticData,...staticData,...staticData]
                        .map(x => {
                            if(x.coordinates){
                                const stringCoordinates = x.coordinates.reduce((str,p,i)=>{
                                    str += `${i===0? '' : ',  ' }` + p.toFixed(2) 
                                    return str
                                },'')
                                return { ...x, coordinates: stringCoordinates }
                            }
                            return x
                        })
                        .map(x => {
                            const valid = fields.reduce((f,y) => {
                                f[y] = x[y]
                                return f
                            },{})
                            return valid
                        })
                        .filter(x => {
                            return x.vehicleNumber.toLowerCase().includes(searchString)
                        })

        // console.log(data)

        const config = {stiffness:850, damping:50}
        const toCSSZoom = (scale) => ({ transform: `scale(1, ${scale})` })

        return(
            <Motion  
                defaultStyle={{scale: 0 }} 
                style={{scale: spring(1, config )}}
            >
            {
            value => 
            <RootStyle style={toCSSZoom(value.scale)}>
                <HeaderStyle >
                    {
                        searchMode?
                        <SearchStyle>
                            <SearchCloseIcon>
                                <Icon name= {'chevron left'} size='large' onClick={this.onCancelSearch} />
                            </SearchCloseIcon>
                            <InputStyle>
                                <Input value={searchString} onChange={this.onChangeSearch} 
                                placeholder='Enter Vehicle Number' 
                                style={{width:'80%'}}
                            />
                            </InputStyle>
                        </SearchStyle>
                        :
                        <HeadingStyle> {`${entity}' List`} </HeadingStyle>
                    }

                    { !searchMode?
                        <SearchIconStyle onClick={this.onClickSearch} >
                            <Icon name= {'search'} size='large'  />
                        </SearchIconStyle>
                        :
                        null
                    }

                    <CloseIconStyle onClick={this.onClickClose} >
                        <Icon name= {'close'} size='large'  />
                    </CloseIconStyle>
                </HeaderStyle>

                <BodyStyle>
                {
                    data.length &&
                    data.map((x,i)=>{
                        return <TableCellStyle key={i} onClick={this.onSelectCell.bind(this,x)} >
                            {
                                Object.values(x).map((y,j)=>{
                                    return <TableTextStyle key={j} style={{ flex:1 }} >
                                        {y}
                                    </TableTextStyle>
                                })
                            }
                        </TableCellStyle>
                    })
                }
                </BodyStyle>

            </RootStyle>
            }

            </Motion>
            
        )
    }
}

export default MapTable