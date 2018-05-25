let url = process.env.CLOUDAMQP_URL || "amqp://zklckogy:uq1LZVrxru56y_o_fg9Xf0VB08cXzeZT@emu.rmq.cloudamqp.com/zklckogy";

const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const amqplib = require('amqplib').connect(url);
const io = require('socket.io')(server);

let q = 'tasks';


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/msg', function (req, res, next) {
  console.log(req.body);
  msg = req.body.msg

  // Publisher
  amqplib.then(function(conn) {
    var ok = conn.createChannel();
    ok = ok.then(function(ch) {
      ch.assertQueue(q);
      ch.sendToQueue(q, new Buffer(msg));
    });
    return ok;
  }).then(null, console.warn);

  res.json(req.body);
});

// Consumer
amqplib.then(function(conn) {
  var ok = conn.createChannel();
  ok = ok.then(function(ch) {
    ch.assertQueue(q);
    ch.consume(q, function(msg) {
      if (msg !== null) {
        console.log(msg.content.toString());
        io.emit('message', msg.content.toString());
        ch.ack(msg);
      }
    });
  });
  return ok;
}).then(null, console.warn);

io.on('connection', (client) => {
  console.log('client connected!');
})

server.listen(process.env.PORT || 4000, () => console.log('Listening on port 4000!'))
