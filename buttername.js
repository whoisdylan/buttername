
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
  create.driveStraight(.5);
  setInterval(function(){
    create.isBump(function(isBump){
      console.log(isBump);
      if (isBump){
        create.driveStraight(0);
        create.rotate(.5);
      }
      else {
        create.driveStraight(.5);
      }
    });
  }, 50);
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
