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
let debates = [];


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

///////////////////// HTTP REQUEST HANDLERS
app.post('/msg', function (req, res, next) {x
  let msg = req.body.msg;
  let debateId = req.body.debateId;

  // Publisher
  amqplib.then(function(conn) {
    var ok = conn.createChannel();
    ok = ok.then(function(ch) {
      ch.assertExchange('test','fanout', {durable: false}, (err, ok) => { console.log(err);});
      ch.assertQueue(debateId);
      ch.sendToQueue(debateId, new Buffer(msg));
    });
    return ok;
  }).then(null, console.warn);


  let debate = debates.find((x) => { return x.id === debateId });

  if (debate){
    if (debate.args.length === 0)
    debate.start(null); // gotta have a callback for this.
  }
  else {
    console.log('no debate.');
  }

  res.json(req.body);
});

///////////////////// WEBSOCKET METHODS

io.on('connection', (socket) => {
  console.log('client connected!');

  socket.on('gotDebateId', (data) => gotDebateIdHandler(socket, data)); // is it initiated? is the user a debater? for what stance?
  socket.on('amsg', (data) => console.log('hey it works')); // is it initiated? is the user a debater? for what stance?

  //socket.on('initDebate', (data) => {});
  socket.on('startTimer', (data) => {
    console.log('start a timer');
  });


})

server.listen(process.env.PORT || 4000, () => console.log('Listening on port 4000!'))

///////////////////// DEBATE METHODS
gotDebateIdHandler = (socket, data) => {
  let id = data.debateId;
  console.log('debate id: ' + id);

  if (id === null || id === '')
    return;

  socket.join(id);

  let debate = debates.find((x) => { return x.id === id });
  if (debate) {
    console.log('debate found, id: ' + debate.id);
    debate.setUserStance(data.user);
    io.to(id).emit('chatroomReady', {debate: debate});
  }
  else
    createDebateRoom(id, data.user);

  // Consumer
  amqplib.then(function(conn) {
    let ok = conn.createChannel();
    ok = ok.then(function(ch) {
      ch.assertQueue(id);
      ch.consume(id, function(msg) {
        if (msg !== null && msg.content.toString() !== '') {
          console.log('consume msg ' + msg.content.toString());
          io.to(id).emit('message', msg.content.toString());
          ch.ack(msg);
        }
      });
    });
    return ok;
  }).then(null, console.warn);
}

createDebateRoom = (debateId, user) => {
  let debate = new Debate(debateId, user);
  debates.push(debate);
  console.log('debate created, id: ' + debateId);
  io.in(debateId).emit('debateCreated', debate);
}

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
