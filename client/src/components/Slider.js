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

class Slider extends React.Component {

  render() {
    return (
      <Styles opacity={this.props.value > 10 ? (this.props.value / 500) : .1} color={this.props.color}>
        <input type="range" min={0} max={500} value={this.props.value} className="slider" step="10" onChange={this.props.onChange} />
        <div><span class="left">({this.props.value}, {this.props.value})</span></div>
      </Styles>
    )
  }
}

export default Slider;