
//======================
// IMPORTS
//======================

var head = require('./head');
var create = require('./create');

//======================
// CODE
//======================

head.setHeadTilt(500);
head.setHeadPan(500);

create.init(function(){
  console.log("drive");
  var i = 0;
  setInterval(function(){
    create.driveStraight(i);
    i += .05;
  }, 1000);
});

//======================
// CLEANUP
//======================

process.on('uncaughtException', function(e){
  console.log(e);
  cleanup();
});

process.on('SIGINT', cleanup);

function cleanup(){
  head.relaxAll(function(){
    process.exit();
  });
  create.cleanup();
}
