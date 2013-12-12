
var utils = require('./utils');

var JOINTS = {
  headTilt: 2,
  headPan: 1
}

function relax(joint){
  return utils.run("dynamixel_util Path=/dev/ttyUSB2 relax " + joint);
}

function setHeadTilt(tilt){
  return utils.run("dynamixel_util Path=/dev/ttyUSB2 move " + JOINTS.headTilt + " " + tilt + " 200")
}

function setHeadPan(pan){
  return utils.run("dynamixel_util Path=/dev/ttyUSB2 move " + JOINTS.headPan + " " + pan + " 200")
}

function relaxAll(done){
  for (var joint in JOINTS){
    if (joint === "headTilt"){
      var p = setHeadTilt(150);
      setTimeout(function(){
        relax(JOINTS.headTilt);
        done();
      }, 1500);
    }
    else {
      relax(JOINTS[joint]);
    }
  }
}

exports.relaxAll = relaxAll;
exports.setHeadPan = setHeadPan;
exports.setHeadTilt = setHeadTilt;

