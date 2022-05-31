const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3005;
const http = require('http');
const ws = require('ws');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});
const clients = {};
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};
wsServer.on('request', function(request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
});*/

/*var controller_coordinates = [
			[100, 20],
			[170, 120],
			[120, 220],
			[100, 320],
			[200, 20],
			[270, 120],
			[220, 220],
			[200, 320]
		];*/

const wss = new ws.Server({noServer: true});

function accept(req, res) {
  if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
    res.end();
    return;
  }

  if (!req.headers.connection.match(/\bupgrade\b/i)) {
    res.end();
    return;
  }
  
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

function onConnect(ws) {
  ws.on('message', function (message) {
	controller_coordinates = JSON.parse(message);
	
	// здесь controller_coordinates определен
	console.log(controller_coordinates);
  });
} 

// а здесь не определен
//console.log(controller_coordinates);

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}

// [здесь controller_coordinates заставляет железки двигаться]


