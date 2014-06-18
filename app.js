var prompt = require('prompt');
var chalk  = require('chalk');
var sp     = require('serialport');

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
  command();
});

serialPort.on('close', function(){
  console.log(chalk.red('Serial Port : Closed'));
  process.exit();
});

function command(){
  prompt.get(['arduino'], function (err, result) {
    if(result.arduino === 'q')
      serialPort.close();
    else
      serialPort.write(result.arduino + '\n');
  });
}

serialPort.open();
