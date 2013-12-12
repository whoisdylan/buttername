
function run(cmd){
  var spawn = require('child_process').spawn;
  cmd = cmd.split(' ');
  var p =  spawn(cmd[0], cmd.slice(1));
  p.stdout.pipe(process.stdout);
  p.stderr.pipe(process.stderr);
  return p;
}

exports.run = run;
