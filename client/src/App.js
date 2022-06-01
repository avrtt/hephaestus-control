import React, { Component } from 'react';

import './index.css';

import Slider1 from './components/Slider1';
import Slider2 from './components/Slider2';
import Slider3 from './components/Slider3';
import Slider4 from './components/Slider4';
import Slider5 from './components/Slider5';
import Slider6 from './components/Slider6';
import Slider7 from './components/Slider7';
import Slider8 from './components/Slider8';

const spanStyle = { 'position': 'absolute' };

let s1 = new Slider1();
let s2 = new Slider2();
let s3 = new Slider3();
let s4 = new Slider4();
let s5 = new Slider5();
let s6 = new Slider6();
let s7 = new Slider7();
let s8 = new Slider8();

console.log(s1.state.value);

var controller_coordinates = [
	[s1.state.value, s1.state.value],
	[s2.state.value, s2.state.value],
	[s3.state.value, s3.state.value],
	[s4.state.value, s4.state.value],
	[s5.state.value, s5.state.value],
	[s6.state.value, s6.state.value],
	[s7.state.value, s7.state.value],
	[s8.state.value, s8.state.value]
];

const s = JSON.stringify(controller_coordinates);

let socket = new WebSocket("ws://localhost:8080");

socket.onopen = function (e) {
	socket.send(s);
};

socket.onmessage = function (event) {
	controller_coordinates = event;
};

class App extends Component {

	componentDidMount() {
		this.draw()
	}

	componentDidUpdate() {
		this.draw()
	}

	state = {
		controller_coordinates: [
			[s1.state.value, s1.state.value],
			[s2.state.value, s2.state.value],
			[s3.state.value, s3.state.value],
			[s4.state.value, s4.state.value],
			[s5.state.value, s5.state.value],
			[s6.state.value, s6.state.value],
			[s7.state.value, s7.state.value],
			[s8.state.value, s8.state.value]
		]
	}

	draw() {
		this.state.controller_coordinates = [
			[s1.state.value, s1.state.value],
			[s2.state.value, s2.state.value],
			[s3.state.value, s3.state.value],
			[s4.state.value, s4.state.value],
			[s5.state.value, s5.state.value],
			[s6.state.value, s6.state.value],
			[s7.state.value, s7.state.value],
			[s8.state.value, s8.state.value]
		];

		var canvas = document.getElementById("grid");
		if (canvas.getContext) {
			var context = canvas.getContext("2d");

			for (var x = 0.5; x < 500; x += 10) {
				context.moveTo(x, 0);
				context.lineTo(x, 500);
			}
			for (var y = 0.5; y < 500; y += 10) {
				context.moveTo(0, y);
				context.lineTo(500, y);
			}

			context.strokeStyle = "rgba(0, 0, 0, .1)";
			context.stroke();

			context.fillStyle = "green";
			context.beginPath();
			context.arc(
				this.state.controller_coordinates[0][0],
				this.state.controller_coordinates[0][1],
				5, 0, 2 * Math.PI, true
			);
			context.fill();
			context.beginPath();
			context.arc(
				this.state.controller_coordinates[1][0],
				this.state.controller_coordinates[1][1],
				5, 0, 2 * Math.PI, true
			);
			context.fill();
			context.beginPath();
			context.arc(
				this.state.controller_coordinates[2][0],
				this.state.controller_coordinates[2][1],
				5, 0, 2 * Math.PI, true
			);
			context.fill();
			context.beginPath();
			context.arc(
				this.state.controller_coordinates[3][0],
				this.state.controller_coordinates[3][1],
				5, 0, 2 * Math.PI, true
			);
			context.fill();

			context.fillStyle = "blue";
			context.beginPath();
			context.arc(
				this.state.controller_coordinates[4][0],
				this.state.controller_coordinates[4][1],
				5, 0, 2 * Math.PI, true);
			context.fill();
			context.beginPath();
			context.arc(
				this.state.controller_coordinates[5][0],
				this.state.controller_coordinates[5][1],
				5, 0, 2 * Math.PI, true
			);
			context.fill();
			context.beginPath();
			context.arc(
				this.state.controller_coordinates[6][0],
				this.state.controller_coordinates[6][1],
				5, 0, 2 * Math.PI, true
			);
			context.fill();
			context.beginPath();
			context.arc(
				this.state.controller_coordinates[7][0],
				this.state.controller_coordinates[7][1],
				5, 0, 2 * Math.PI, true
			);
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
		document.getElementById("grid-coordinates").innerHTML = "";
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

				<span style={spanStyle}><b>1:</b></span><Slider1 id="slider1" color="#008300" />
				<span style={spanStyle}><b> </b></span><Slider2 id="slider2" color="#0000FF" />
				<span style={spanStyle}><b>2:</b></span><Slider3 id="slider3" color="#008300" />
				<span style={spanStyle}><b> </b></span><Slider4 id="slider4" color="#0000FF" />
				<span style={spanStyle}><b>3:</b></span><Slider5 id="slider5" color="#008300" />
				<span style={spanStyle}><b> </b></span><Slider6 id="slider6" color="#0000FF" />
				<span style={spanStyle}><b>4:</b></span><Slider7 id="slider7" color="#008300" />
				<span style={spanStyle}><b> </b></span><Slider8 id="slider8" color="#0000FF" />

				<div class="buttons-container">
					<button type="button" class="button" id="set-default-button">НАЧ</button>
					<button type="button" class="button" id="start-button" onClick={this.processLock}>ВКЛ</button>
					<button type="button" class="button" id="stop-button" onClick={this.processUnlock}>ВЫКЛ</button>
				</div>
			</>
		);
	}
}

export default App;
