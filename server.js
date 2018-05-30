let url = process.env.CLOUDAMQP_URL || "amqp://zklckogy:uq1LZVrxru56y_o_fg9Xf0VB08cXzeZT@emu.rmq.cloudamqp.com/zklckogy";

const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const amqplib = require('amqplib').connect(url);
const io = require('socket.io')(server);
const cluster = require('cluster');
const child_process = require('child_process')
const Debate = require('./Debate');

let q = 'r-409089';
let debates = {};


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

///////////////////// HTTP REQUEST HANDLERS
app.post('/msg', function (req, res, next) {
  let msg = req.body.msg;

  // Publisher
  amqplib.then(function(conn) {
    var ok = conn.createChannel();
    ok = ok.then(function(ch) {
      ch.assertExchange('test','fanout', {durable: false}, (err, ok) => { console.log(err);});
      ch.assertQueue(q);
      ch.sendToQueue(q, new Buffer(msg));
    });
    return ok;
  }).then(null, console.warn);


  let debate = debates[req.body.debateId];
  if (debate.args.length === 0)
    debate.start();

  res.json(req.body);
});

// Consumer
amqplib.then(function(conn) {
  var ok = conn.createChannel();
  ok = ok.then(function(ch) {
    ch.assertQueue(q);
    ch.consume(q, function(msg) {
      if (msg !== null && msg.content.toString() !== '') {
        console.log('consume msg ' + msg.content.toString());
        io.emit('message', msg.content.toString());
        ch.ack(msg);
      }
    });
  });
  return ok;
}).then(null, console.warn);



///////////////////// WEBSOCKET METHODS

io.on('connection', (socket) => {
  console.log('client connected!');
  socket.on('initDebate', (data) => {
    let id = q // TODO: need to generate id or use the queue id
    let debate = new Debate(id);
    debates[debate.id] = debate;
    socket.emit('debateInitiated', debate);
  });

  //socket.on('initDebate', (data) => {});
  socket.on('startTimer', (data) => {
    console.log('start a timer');
  });

})

server.listen(process.env.PORT || 4000, () => console.log('Listening on port 4000!'))

///////////////////// TIMER METHODS


///////////////////// WORKER METHODS
timerWorkerHandler = (msg) => {
  let workerId = workersId[msg.roomId];
  let worker = cluster.workers[workerId];

  switch (msg.cmd) {
    case 'startTimer':
      console.log('in START TIMER');
      break;

    case 'stopTimer':
      console.log('in STOP TIMER');
      break;

    case 'killWorker':
      console.log('in KILL WORKER');
      worker.kill();
      break;

    default:
      worker.kill();

  }
}
