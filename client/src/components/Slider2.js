import React from 'react';
import styled from 'styled-components';
import { observable, makeObservable, action } from "mobx"


const sliderThumbStyles = (props) => (`
  width: 20px;
  height: 20px;
  background: ${props.color};
  cursor: pointer;
  outline: 5px solid #333;
  -webkit-transition: .2s;
  transition: opacity .2s;
`);

const Styles = styled.div`
  display: flex;
  align-items: center;
  color: #888;
  margin-top: 2px;
  margin-bottom: 2px;
  .value {
    flex: 1;
    font-size: 20px;
  }
  .slider {
    flex: 6;
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #efefef;
    outline: none;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      ${props => sliderThumbStyles(props)}
    }
    &::-moz-range-thumb {
      ${props => sliderThumbStyles(props)}
    }
  }
`;

class Slider2 extends React.Component {
  state = 250

  handleOnChange = (e) => this.setState({ value: e.target.value })

  constructor() {
    makeObservable(this, {
      state: observable,
      handleOnChange: action
    })
  }

  render() {
    return (
      <Styles opacity={this.state > 10 ? (this.state / 500) : .1} color={this.props.color}>
        <input type="range" min={0} max={500} value={this.state} className="slider" step="10" onChange={this.handleOnChange} />
        <div><span class="left">({this.state}, {this.state})</span></div>
      </Styles>
    )
  }
}

export const slider2 = new Slider2();
export default Slider2;