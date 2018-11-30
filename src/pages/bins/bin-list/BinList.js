

import React from 'react'
import styled from 'styled-components'
import {Icon, Dropdown} from 'semantic-ui-react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import './styles.css'
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;


const RootStyle = styled.div`
    width:100%;
    height:100%;
`

const ContainerStyle = styled.div`
    width:100%;
    height:100%;
    padding:30px 60px;
    direction:flex;
    flex-direction:column;
`
const TableHeaderStyle = styled.div`
    height:60px;
    width:100%;
    display:flex;
    align-items:center;
`
const TableHeadingStyle = styled.h2`
    color:#1B2D50;
    text-align:center;
    margin:0px 0px 0px 0px;
    padding:0 0px 0 0;
    letter-spacing:1px;
    flex:0 0 60%;
`

const HeaderDropdownStyle = styled.div`
    flex:0 0 15%;
    margin-top:100px;
`

const TableStyle = styled.div`
    width:100%;
    margin:30px 0px;
`

const NoDataStyle = styled.div`
    width:100%;
    height:150px;
    margin:50px 0px;
    font-size:1.5em;
    display:flex;
    justify-content:center;
    align-items:center;
    color:#777;
    border:1px solid #ccc;
`
const TableActionBarStyle = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-end;
`
const SearchBarStyle = styled.div`
    flex: 0 0 30%;
    margin:0 10px;
`
const CsvButtonStyle = styled.div`
    margin:0 10px;
    flex:  0 0 10%;
`

const pagingOptions = {
    onSizePerPageChange: (sizePerPage, page) => {
      console.log('Size per page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
    },
    onPageChange: (page, sizePerPage) => {
      console.log('Page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
    }
  };

  
class Root extends React.Component {

    state = {
        entity:'bins',
        columns:[],
        entities:[]
    }

    componentDidMount = () => {
        this.saveDataToState()
    }

    // componentWillReceiveProps = (nextProps) => {
    //     if(this.props !== nextProps){
    //         this.setState({

    //         })
    //     }
    // }

    saveDataToState = (passedEntity) => {
        let entity = null
        if(!passedEntity){
            entity = this.state.entity
        } else {
            entity = passedEntity
        }
        const entityData = this.props.allData[entity]

        const headerSortingStyle = { color: '#fff' };


        const columns = allFields[entity].map(x => {
            const dataField = x
            const text = capitalize(x).split(/(?=[A-Z])/).join(" ");
            return { dataField, text, sort:true, headerSortingStyle }
        })

        const entities = entityData.reduce((f,x,i)=>{
            let record = {}
            allFields[entity].forEach(key => {
                let value = x[key]

                if(key === 'coordinates'){
                    value = value.reduce((str,p,i)=>{
                        str += `${i===0? '' : ',  ' }` + p
                        return str
                    },'')
                }
                value = capitalize(value)
                record = { ...record, [key] : value }
            })
            f = [...f, record]
            return f
        },[])
        
        this.setState({
            columns,
            entities
        })
    }

    onChangeEntity = (e,data) => {
        console.log(data.value)
        this.setState({
            entity : data.value
        })
        this.saveDataToState(data.value)
    }

    render(){
        const { entity, columns, entities }  = this.state
        
        return(
            <RootStyle>
                <ContainerStyle>

                    <TableHeaderStyle>
                        <HeaderDropdownStyle>
                            <Dropdown 
                                placeholder='Select Data Type' 
                                fluid selection 
                                options={entitiesOptions}
                                onChange={this.onChangeEntity}
                            />
                        </HeaderDropdownStyle>
                        <TableHeadingStyle>
                            {`All  ${capitalize(entity)}'s  Data`}
                        </TableHeadingStyle>
                    </TableHeaderStyle>

                    {   (!!entities.length && !!columns.length) ?
                        <ToolkitProvider
                            keyField='binNumber' 
                            data={ entities } 
                            columns={ columns } 
                            
                            search={true}
                            exportCSV
                        >
                            {
                            props => (
                                <div>
                                    <TableActionBarStyle>
                                        <SearchBarStyle>
                                            <SearchBar 
                                                { ...props.searchProps } 
                                                placeholder="Type to search fields..."
                                            />  
                                        </SearchBarStyle>
                                        <CsvButtonStyle>
                                            <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                                        </CsvButtonStyle>
                                    </TableActionBarStyle>
                                    <TableStyle>
                                        <BootstrapTable 
                                            { ...props.baseProps }
                                            headerClasses="table-list-header-class"
                                            // pagination={ paginationFactory(pagingOptions) }
                                            hover
                                        />
                                    </TableStyle>
                                </div>
                            )
                            }
                        </ToolkitProvider>
                        :
                        <NoDataStyle>
                            No data found for this data type.
                        </NoDataStyle>
                    }

                </ContainerStyle>
            </RootStyle>
        )
    }
}

export default Root


const entitiesOptions = [
  {
    text: 'bins',
    value: 'bins',
    image: <Icon name='rocket' size='large' color='blue' />  ,
  },
]

const allFields= {
    'bins':['binNumber','status','coordinates','fill','binType'],
}


// const allData = {
//     bins : [
//         {
//             coordinates:[28.731188, 77.127796],
//             status:'empty',
//             binNumber:'bin34343',
//             fill:'10%',
//             binType:'bin'
//         },
//         {
//             coordinates:[28.725909, 77.061754],
//             status:'empty',
//             binNumber:'bin97996',
//             fill:'15%',
//             binType:'bin'
//         },
//         {
//             coordinates:[28.516222, 77.202781],
//             status:'full',
//             binNumber:'bin2323232',
//             fill:'90%',
//             binType:'bin'
//         },
//         {
//             coordinates:[28.648536, 77.273403],
//             status:'half',
//             binNumber:'bin020223',
//             fill:'50%',
//             binType:'bin'
//         },
//         {
//             coordinates:[28.648216, 77.271202],
//             status:'full',
//             binNumber:'bin2929232',
//             fill:'85%',
//             binType:'bin'
//         },
//         {
//             coordinates:[28.658496, 77.450198],
//             status:'half',
//             binNumber:'bin3200699',
//             fill:'40%',
//             binType:'bin'
//         },   
//         {
//             coordinates:[28.653396, 77.650198],
//             status:'inactive',
//             binNumber:'bin7833699',
//             fill:'40%',
//             binType:'bin'
//         },    
//     ],
// }




function capitalize(str=''){
    return str.trim().split('')
          .map((char,i) => i === 0 ? char.toUpperCase() : char )
          .reduce((final,char)=> final += char, '' )
    }