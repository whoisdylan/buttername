var SerialPort = require("serialport").SerialPort

var serialPort = null;

var serialPort = new SerialPort("/dev/ttyUSB0", {
    baudrate: 57600
});


exports.init = function(ready){
  serialPort.on("open", function () {
      console.log('open');
      serialPort.on('data', function(data) {
          console.log('data received: ' + data);
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
