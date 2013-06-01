var stream = require('stream')
var util = require('util')
var SerialPort = require('serialport').SerialPort

// Give our device a stream interface
util.inherits(Device,stream);

// Export it
module.exports=Device;

function Device(device,driver) {

  var self = this;

  // This device will emit data
  this.readable = true;
  // This device can be actuated
  this.writeable = true;

  // Use a G with only alphanumeric characters
  this.G = device.replace(/\W/g, '')

  this.V = 0;
  // 240 is a display_text device type
  this.D = 240;

  this.name = 'Xbee'

  this._driver = driver;

  var serialPort = new SerialPort(device,{
    baudrate: 9600
  });

  this._serialPort = serialPort

  serialPort.on('open',function(){

    console.log('open')
    self.emit('data','1')
    driver.emit('register',self);
    serialPort.on('data',function(data){
      self.emit('data',data.toString());
    });
  })
};


Device.prototype.write = function(data) {
  this._serialPort.write(data);
};


Device.prototype.end = function() {
  this._serialPort.close();
};