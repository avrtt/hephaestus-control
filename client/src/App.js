import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import styled from "styled-components";
import Slider from './components/Slider';
import './index.css';

const Styles = styled.div`
  .App {
    display: flex;
    justify-content: center;
  }
  .wrapper {
    margin-top: 20vh;
    width: 50%;
  }
`;

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
    this.draw()
  }

  componentDidUpdate() {
    this.draw()
  }

  callApi = async () => {
    const response = await fetch('/api/state');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

draw() {
	
	var controller_coordinates = [
			[this.state.response[0], this.state.response[1]],
			[this.state.response[2], this.state.response[3]],
			[this.state.response[4], this.state.response[5]],
			[this.state.response[6], this.state.response[7]],
			[this.state.response[8], this.state.response[9]],
			[this.state.response[10], this.state.response[11]],
			[this.state.response[12], this.state.response[13]],
			[this.state.response[14], this.state.response[15]]
		];
	
	var canvas = document.getElementById("grid");
	if (canvas.getContext) {
		var context = canvas.getContext("2d");
		
        for(var x=0.5;x<500;x+=10) {
			context.moveTo(x,0);
			context.lineTo(x,500);
        }
        for(var y=0.5; y<500; y+=10) {
			context.moveTo(0,y);
			context.lineTo(500,y);
		}
	
    context.strokeStyle="rgba(0, 0, 0, .1)";
    context.stroke();
    
    context.fillStyle = "green";
	context.beginPath();
	context.arc(controller_coordinates[0][0], controller_coordinates[0][1], 5, 0, 2 * Math.PI, true);
	context.fill();
	context.beginPath();
	context.arc(controller_coordinates[1][0], controller_coordinates[1][1], 5, 0, 2 * Math.PI, true);
	context.fill();
	context.beginPath();
	context.arc(controller_coordinates[2][0], controller_coordinates[2][1], 5, 0, 2 * Math.PI, true);
	context.fill();
	context.beginPath();
	context.arc(controller_coordinates[3][0], controller_coordinates[3][1], 5, 0, 2 * Math.PI, true);
	context.fill();
	
	context.fillStyle = "blue";
	context.beginPath();
	context.arc(controller_coordinates[4][0], controller_coordinates[4][1], 5, 0, 2 * Math.PI, true);
	context.fill();
	context.beginPath();
	context.arc(controller_coordinates[5][0], controller_coordinates[5][1], 5, 0, 2 * Math.PI, true);
	context.fill();
	context.beginPath();
	context.arc(controller_coordinates[6][0], controller_coordinates[6][1], 5, 0, 2 * Math.PI, true);
	context.fill();
	context.beginPath();
	context.arc(controller_coordinates[7][0], controller_coordinates[7][1], 5, 0, 2 * Math.PI, true);
	context.fill();
  }
}

showCoords(event) {
	var canvas = document.getElementById("grid");
	var rect = canvas.getBoundingClientRect();
    var x = (event.clientX - rect.left - 2) / 10;
    var y = (event.clientY - rect.top - 2) / 10;
    var coords = Math.round(x) + "0 " + Math.round(y) + "0";
    document.getElementById("grid-coordinates").innerHTML = coords;
}
  
clearCoords() {
	document.getElementById("grid-coordinates").innerHTML="";
}

processLock() {
	document.getElementById("start-button").disabled = true;
	document.getElementById("set-default-button").disabled = true;
}

processUnlock() {
	document.getElementById("start-button").disabled = false;
	document.getElementById("set-default-button").disabled = false;
}

  render() {	  
    return (
    <>
		<div class="grid-container">
			<canvas id="grid" width="500" height="500"
				onMouseMove={this.showCoords}
				onMouseOut={this.clearCoords}></canvas>
			<div id="grid-coordinates"></div>
		</div>
		
		<div><b>1: </b><span class="left">({this.state.response[0]} {this.state.response[1]})</span>, <span class="right">({this.state.response[8]} {this.state.response[9]})</span></div>
		<Slider class="drive-slider" color="#008300" />
		<Slider class="drive-slider" color="#0000FF" />
		<div><b>2: </b><span class="left">({this.state.response[2]} {this.state.response[3]})</span>, <span class="right">({this.state.response[10]} {this.state.response[11]})</span></div>
		<Slider class="drive-slider" color="#008300" />
		<Slider class="drive-slider" color="#0000FF" />
		<div><b>3: </b><span class="left">({this.state.response[4]} {this.state.response[5]})</span>, <span class="right">({this.state.response[12]} {this.state.response[13]})</span></div>
		<Slider class="drive-slider" color="#008300" />
		<Slider class="drive-slider" color="#0000FF" />
		<div><b>4: </b><span class="left">({this.state.response[6]} {this.state.response[7]})</span>, <span class="right">({this.state.response[14]} {this.state.response[15]})</span></div>
		<Slider class="drive-slider" color="#008300" />
		<Slider class="drive-slider" color="#0000FF" />
	
		<div class="buttons-container">
			<button type="button" class="button" id="set-default-button">НАЧ</button>
			<button type="button" class="button" id="start-button" onClick={this.processLock}>ВКЛ</button>
			<button type="button" class="button" id="stop-button" onClick={this.processUnlock}>ВЫКЛ</button>
		</div>
		
		<div>Слайдер скорости (режимы от 1 до 10)</div>
		<div>При включении блокировать все слайдеры</div>
		<div>Отправка с фронта в бэк</div>
		<div>Убрать значения справа от слайдеров для приводов; они должны изменять координаты в скобках</div>
		
	</>
    );
  }
}

export default App;
