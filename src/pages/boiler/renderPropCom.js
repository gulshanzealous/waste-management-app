import React, {Component} from 'react'


class Cat extends Component{
    render(){
        const {mouse} = this.props

        return(
            <h1 style={{ position:'absolute', left: mouse.x, top: mouse.y }} > Cat </h1>
        )
    }
}

class Mouse extends React.Component {
    constructor(props) {
      super(props);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.state = { x: 0, y: 0 };
    }
  
    handleMouseMove(event) {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }
  
    render() {
        console.log(this.state)
        const {x,y} = this.state
      return (
        <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
  
          {/* ...but how do we render something other than a <p>? */}
          {/* <p>The current mouse position is ({this.state.x}, {this.state.y})</p> */}

          {this.props.render({ x,y })}
        </div>
      );
    }
  }

  class MouseTracker extends React.Component {
    render() {
      return (
        <div>
          <h1>Move the mouse around!</h1>
          <Mouse render={(mouse)=>(
              <Cat mouse={mouse} />
          )}  />
        </div>
      );
    }
  }

export default MouseTracker

