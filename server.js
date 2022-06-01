const bodyParser = require('body-parser');
const fs = require('fs')
const { core } = require('botcorejs')

const cfg = JSON.parse(fs.readFileSync('./config.json'))

const express = require('express')
const enableWs = require('express-ws')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

enableWs(app)
let wsCon = null;
app.ws('/ws', (ws, req) => {
  wsCon = ws
  console.log("ws:\n", ws)
  ws.on('message', msg => {
    ws.send(msg)
    let parsed = JSON.parse(msg)
    console.log("Server:\n", parsed)
  })

  ws.on('close', () => {
    console.log('WebSocket was closed')
  })
})

app.listen(8080)

// return beta angle, alpha in radians
function angletranslate(alpha, Ralpha, Rbeta, centreDistance, rodLength) {
  let x0 = centreDistance + Ralpha * Math.cos(alpha)
  let y0 = Ralpha * Math.sin(alpha)
  let d = Math.sqrt(x0 * x0 + y0 * y0)
  let a = (rodLength * rodLength - Rbeta * Rbeta + d * d) / (2 * d)
  let b = (- rodLength * rodLength + Rbeta * Rbeta + d * d) / (2 * d)
  let x2 = x0 * (1 - a / d)
  let y2 = y0 * (1 - a / d)
  let h = Math.sqrt(rodLength * rodLength - a * a)
  let x3 = x2 - h * y0 / d
  let y3 = y2 + h * x0 / d
  return Math.atan2(y3, x3)
}

var itmpcfg = {};
itmpcfg.listen = cfg.listen;
itmpcfg.listen[0].expressapp = app;
itmpcfg.nodes = cfg.board[1].usart;
core.init(itmpcfg, __dirname)
core.start()

const con = core.getConnector(cfg.board[1].usart['rmd'].cfg.addr)

con.describe('', []).then((response) => {
  console.log(response)
}).catch((err) => {
  console.log('err', err)
})

const K1 = 10 * 180 / Math.PI
const Shift1 = 0
const K2 = 10 * 180 / Math.PI
const Shift2 = 0
const K3 = -10 * 180 / Math.PI
const Shift3 = 150

const K4 = -10 * 180 / Math.PI
const Shift4 = 0
const K5 = -10 * 180 / Math.PI
const Shift5 = -200
const K6 = 10 * 180 / Math.PI
const Shift6 = -10

async function run() {
  let tr = fs.readFileSync('./tr.json')
  tr = JSON.parse(tr)
  if (!Array.isArray(tr)) throw ('trajectory should be array of arrays [x2,y2,alpha,x1,y1]')
  let trlen = tr.length
  let shift = Math.floor(tr.length / 2)

  let angles = []
  for (let st = 0; st < tr.length; st++) {
    const baseangle1 = 5
    const shiftangle1 = 10
    // let rangle1 = -27.4 * Math.PI / 180 // servo to zero
    // let rangle1 = 43.76 * Math.PI / 180 // servo to 45 deg
    let rangle1 = (0 + (-baseangle1 - shiftangle1)) * Math.PI / 180 + (Math.atan2(tr[st][4], -tr[st][3]) + Math.PI / 2) - 20 * Math.PI / 180
    let servoangle1 = Math.PI / 2 - angletranslate(Math.PI / 2 - rangle1, 16, 10, 90.7, 86.5)
    let servoangle1g = servoangle1 * 180 / Math.PI
    if (isNaN(servoangle1))
      console.log('NaN servoangle1')
    const shiftangle2 = 45
    let rangle2 = -(Math.atan2(tr[st][1] - tr[st][4], tr[st][0] - tr[st][3]) + Math.PI / 2) + 10 * Math.PI / 180
    //		let servoangle2 = -30 * Math.PI / 180// Math.PI / 2 - angletranslate(Math.PI / 2 - rangle2, 10, 7.1, 69, 70)
    let servoangle2 = rangle1 + Math.PI / 2 - angletranslate(Math.PI / 2 - rangle2 - shiftangle2 * Math.PI / 180, 10, 7.1, 69, 70)
    if (isNaN(servoangle2))
      console.log('NaN servoangle2')
    let rangle3 = tr[st][2] * Math.PI / 180 - rangle2
    if (isNaN(rangle3))
      console.log('NaN rangle3')
    angles.push([servoangle1, servoangle2, rangle3])
  }

  let dangles = []
  let start = []
  let st = 0
  let lastpos = []

  for (st = 0; st < trlen; st++) {
    let position = [
      Math.round(angles[st][0] * K1 + 1500 + Shift1),
      Math.round(angles[st][1] * K2 + 1500 + Shift2),
      Math.round(angles[st][2] * K3 + 1500 + Shift3),
      Math.round(angles[(st + shift) % trlen][0] * K4 + 1500 + Shift4),
      Math.round(angles[(st + shift) % trlen][1] * K5 + 1500 + Shift5),
      Math.round(angles[(st + shift) % trlen][2] * K6 + 1500 + Shift6)
    ]
    if (st === 0) {
      start = position;
    } else {
      dangles.push(position.map((v, i) => Math.round(v - lastpos[i])))
    }
    lastpos = position;
  }

  // return
  try {
    let r = await con.call('pos', [start[0], start[1], start[2], start[3], start[4], start[5], 1500, 1500])
    let coords = [[start[0], start[1]], [start[2], start[3]], [start[4], start[5]], [1500, 1500]]
    console.log(coords)
    if (wsCon != null) {
      let s = JSON.stringify(coords);
      wsCon.send(s);
    }
    else {
    console.log("No ws connection")
    }
  } catch (err) {
    console.error(err);
  }
}

run();