import React from 'react'
import {VictoryPie, VictoryAnimation, VictoryLabel} from "victory"
import styled from 'styled-components'


const RootStyle = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

class Pie extends React.Component {
    constructor() {
      super();
      this.state = {
        percent: 0, data: this.getData(0)
      };
    }
  
    componentDidMount() {
        if(this.props.bins && this.props.bins.length){
            this.setPercent(this.props.bins)
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.bins && nextProps.bins.length && this.props.bins !== nextProps.bins.length){
            this.setPercent(nextProps.bins)
        }
    }

    setPercent = (bins) => {
        const totalFill = bins.reduce((f,x)=>{
            const fill = parseInt(x.fill.split('%')[0])
            console.log(fill)
            f += fill
            return f
        },0)
        console.log(totalFill)
        const fillPercent = totalFill / (bins.length)
        this.setState({
            percent: fillPercent,  data: this.getData(fillPercent)
        })
    }
  
    getData(percent) {
      return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
    }
  
    render() {
      return (
        <RootStyle>
          <svg viewBox="0 0 400 400" height={300} width={300} >

            <VictoryPie
                standalone={false}
                animate={{ duration:1000 }}
                width={400} height={400}
                data={this.state.data}
                colorScale={["tomato", "green" ]}
                // colorScale={'green'}
                labels={() => null}
                padAngle={3}
                innerRadius={100}
                labelRadius={200}
                outerRadius={200}
                startAngle={-90}
                endAngle={90}
                
            />

            <VictoryAnimation duration={1000} data={this.state}>
              {(newProps) => {
                return (
                  <VictoryLabel
                    textAnchor="middle" verticalAnchor="middle"
                    x={200} y={150}
                    text={`${Math.round(newProps.percent)}%`}
                    // text={<PieText percent={newProps.percent} />}
                    style={{ fontSize: 30,fontFamily:"Questrial" }}
                  />
                );
              }}
            </VictoryAnimation>

            <VictoryAnimation duration={1000} data={this.state}>
              {(newProps) => {
                return (
                  <VictoryLabel
                    textAnchor="middle" verticalAnchor="middle"
                    x={200} y={250}
                    text={`System-wide waste capacity used`}
                    // text={<PieText percent={newProps.percent} />}
                    style={{ fontSize: 25, fontFamily:"Questrial" }}
                  />
                );
              }}
            </VictoryAnimation>

            <VictoryAnimation duration={1000} data={this.state}>
              {(newProps) => {
                return (
                  <VictoryLabel
                    textAnchor="middle" verticalAnchor="middle"
                    x={200} y={320}
                    text={`Approx. 35 days to full capacity exhaustion`}
                    // text={<PieText percent={newProps.percent} />}
                    style={{ fontSize: 21, fill:"#e55",fontWeight:'600', fontFamily:"Questrial" }}
                  />
                );
              }}
            </VictoryAnimation>

          </svg>
          
        </RootStyle>
      );
    }
  }
  
export default Pie