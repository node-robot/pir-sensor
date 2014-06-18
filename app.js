var prompt = require('prompt');
var chalk  = require('chalk');
var sp     = require('serialport');
var cp     = require('child_process');
var _      = require('lodash');

var SerialPort = sp.SerialPort;
var serialPort = new SerialPort('/dev/tty.usbmodem1451', {
  baudrate: 9600,
  parser: sp.parsers.readline('\n')
}, false);

prompt.start();

serialPort.on('open', function(){
  console.log(chalk.blue('Serial Port : Open'));
  command();
});

serialPort.on('data', function(data) {
  console.log(chalk.blue.bold('Rx'), chalk.green.underline(data));

  var isPir = data.indexOf("PIR") !== -1;
  if(isPir){
    var value = data.split(':')[1] * 1;
    if(value){lazyWarning();}
  }else{
    command();
  }
});

serialPort.on('close', function(){
  console.log(chalk.red('Serial Port : Closed'));
  process.exit();
});

function warning(){
  cp.exec('say warning');
}

function command(){
  prompt.get(['arduino'], function (err, result) {
    if(result.arduino === 'q')
      serialPort.close();
    else
      serialPort.write(result.arduino + '\n');
  });
}

serialPort.open();
var lazyWarning = _.debounce(warning, 2000, {leading:true, trailing:false});
