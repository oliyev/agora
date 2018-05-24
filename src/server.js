const express = require('express')
const app = express()
var bodyParser = require('body-parser');

var q = 'tasks';
var url = process.env.CLOUDAMQP_URL || "amqp://zklckogy:uq1LZVrxru56y_o_fg9Xf0VB08cXzeZT@emu.rmq.cloudamqp.com/zklckogy";
var open = require('amqplib').connect(url);

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
  open.then(function(conn) {
    var ok = conn.createChannel();
    ok = ok.then(function(ch) {
      ch.assertQueue(q);
      ch.sendToQueue(q, new Buffer(msg));
    });
    return ok;
  }).then(null, console.warn);

  res.json(req.body);
});

app.get('/msg', (req, res) => {
  let hasMsg = false;
  let message = '';

  // Consumer
  open.then(function(conn) {
    var ok = conn.createChannel();
    ok = ok.then(function(ch) {
      ch.assertQueue(q);
      ch.consume(q, function(msg) {
        if (msg !== null) {
          console.log(msg.content.toString());
          message = msg;
          ch.ack(msg);
        }
      });
    });
    return ok;
  }).then(null, console.warn);
  res.send(message);
})

app.listen(process.env.PORT || 4000, () => console.log('Example app listening on port 4000!'))
