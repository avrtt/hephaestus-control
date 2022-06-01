import React, { Component } from 'react';

import './index.css';

import Slider from './components/Slider';

const spanStyle = { 'position': 'absolute' };

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			coords: [
				[50, 50],
				[50, 50],
				[50, 50],
				[50, 50],
				[50, 50],
				[50, 50],
				[50, 50],
				[50, 50],
			]
		}
	}

	handleOnChange = (e, index) => {
		let oldCoords = [...this.state.coords];
		oldCoords[index] = [e.target.value, e.target.value];
		this.setState({ coords: oldCoords });
		let s = JSON.stringify(oldCoords);
		this.socket.send(s);
	}

	componentDidMount() {
		this.socket = new WebSocket("ws://localhost:8080/ws");

		this.socket.onopen = () => {
			setTimeout(() => {
				let s = JSON.stringify(this.state.coords);
				this.socket.send(s);
			}, 100)
		}

		this.socket.onmessage = (event) => {
			let s = JSON.parse(event);
			this.setState({ coords: s });
		};

		this.draw()
	}

	componentDidUpdate() {
		this.draw()
	}

	draw() {
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
				this.state.coords[0][0],
				this.state.coords[0][1],
				5, 0, 2 * Math.PI, true
			);
			context.fill();
			context.beginPath();
			context.arc(
				this.state.coords[1][0],
				this.state.coords[1][1],
				5, 0, 2 * Math.PI, true
			);
			context.fill();
			context.beginPath();
			context.arc(
				this.state.coords[2][0],
				this.state.coords[2][1],
				5, 0, 2 * Math.PI, true
			);
			context.fill();
			context.beginPath();
			context.arc(
				this.state.coords[3][0],
				this.state.coords[3][1],
				5, 0, 2 * Math.PI, true
			);
			context.fill();

			context.fillStyle = "blue";
			context.beginPath();
			context.arc(
				this.state.coords[4][0],
				this.state.coords[4][1],
				5, 0, 2 * Math.PI, true);
			context.fill();
			context.beginPath();
			context.arc(
				this.state.coords[5][0],
				this.state.coords[5][1],
				5, 0, 2 * Math.PI, true
			);
			context.fill();
			context.beginPath();
			context.arc(
				this.state.coords[6][0],
				this.state.coords[6][1],
				5, 0, 2 * Math.PI, true
			);
			context.fill();
			context.beginPath();
			context.arc(
				this.state.coords[7][0],
				this.state.coords[7][1],
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

				<span style={spanStyle}><b>1:</b></span><Slider id="slider1" color="#008300" value={this.state.coords[0][0]} onChange={(e) => this.handleOnChange(e, 0)} />
				<span style={spanStyle}><b> </b></span><Slider id="slider2" color="#0000FF" value={this.state.coords[1][0]} onChange={(e) => this.handleOnChange(e, 1)} />
				<span style={spanStyle}><b>2:</b></span><Slider id="slider3" color="#008300" value={this.state.coords[2][0]} onChange={(e) => this.handleOnChange(e, 2)} />
				<span style={spanStyle}><b> </b></span><Slider id="slider4" color="#0000FF" value={this.state.coords[3][0]} onChange={(e) => this.handleOnChange(e, 3)} />
				<span style={spanStyle}><b>3:</b></span><Slider id="slider5" color="#008300" value={this.state.coords[4][0]} onChange={(e) => this.handleOnChange(e, 4)} />
				<span style={spanStyle}><b> </b></span><Slider id="slider6" color="#0000FF" value={this.state.coords[5][0]} onChange={(e) => this.handleOnChange(e, 5)} />
				<span style={spanStyle}><b>4:</b></span><Slider id="slider7" color="#008300" value={this.state.coords[6][0]} onChange={(e) => this.handleOnChange(e, 6)} />
				<span style={spanStyle}><b> </b></span><Slider id="slider8" color="#0000FF" value={this.state.coords[7][0]} onChange={(e) => this.handleOnChange(e, 7)} />

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
