import React from 'react'

class Root extends React.Component {

    state = {

    }

    componentDidMount = () => {

    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props !== nextProps){
            this.setState({

            })
        }
    }

    render(){
        return(
            <div>
                hello
            </div>
        )
    }
}

export default Root