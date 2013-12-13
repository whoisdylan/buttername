var SerialPort = require("serialport").SerialPort

var serialPort = null;

var serialPort = new SerialPort("/dev/ttyUSB0", {
    baudrate: 57600
});

var gcb = [];

exports.init = function(ready){
  serialPort.on("open", function () {
      console.log('open');
      serialPort.on('data', function(data) {
          console.log('data received: ' + data);
          if (gcb.length > 0)
            gcb.pop()(data);
      });  
      serialPort.write(new Buffer([128, 132]), function(err, results) {
          console.log('err ' + err);
          console.log('results ' + results);
          ready();
      });  
  });
}

exports.cleanup = function(){
  driveStraight(0);
  serialPort.close();
}

exports.isBump = function(cb){
  serialPort.write(new Buffer([149, 1, 7]))

  gcb.push(function(bumpData){
    var state = bumpData[0];
    var bumpRight = state & 0x1;
    var bumpLeft = state & 0x2;
    var bumpBoth = state & 0x3;
    cb(!!(bumpRight || bumpLeft || bumpBoth));
  });
}

function driveStraight(percentSpeed){
  maxSpeed = 500;
  var highV = ((maxSpeed*percentSpeed) >> 8) & 0xff;
  var lowV = (maxSpeed*percentSpeed) & 0xff;
    serialPort.write(new Buffer([137, highV, lowV, 0x7f, 0xff]), function(err, results) {
        console.log('ds, err ' + err);
        console.log('ds, results ' + results);
    });  
}
exports.driveStraight = driveStraight;

exports.rotate = function(speed){
  maxSpeed = 500;
  var highV = ((maxSpeed*speed) >> 8) & 0xff;
  var lowV = (maxSpeed*speed) & 0xff;
  var highR = (speed<0)?0xff:0x00;
  var lowR = (speed<0)?0xff:0x01;
    serialPort.write(new Buffer([137, highV, lowV, highR, lowR]), function(err, results) {
        console.log('dr, err ' + err);
        console.log('dr, results ' + results);
    });  
}
