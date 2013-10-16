var stream = require('stream')
var util = require('util')
var rfxcom = require('rfxcom');



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

  this._app = driver._app;
  // Use a G with only alphanumeric characters
  this.G = device.device_name;

  this.V = 0;
  // 240 is a display_text device type
  // 1009 is the device type used by the belkin_wemo driver
  this.D = 1010;

  this.name = 'rfxtrx433 ' + device.device_name;

  this._driver = driver;

  this._device = device;
  //var serialPort = new SerialPort(device,{
  //  baudrate: 9600
  //});

  //this._serialPort = serialPort


  //serialPort.on('open',function(){

    //console.log('open')
    //self.emit('data','1')
    driver.emit('register',self);
    //serialPort.on('data',function(data){
  //    self.emit('data',data.toString());
//    });
//  })
};


Device.prototype.write = function(data) {
  //this._serialPort.write(data);
  
  this._app.log.info("Write Received");
  this._app.log.info(this._device);
    if (typeof data == 'string') {
        data = JSON.parse(data);
    }
  this._app.log.info(data); 
var lev = data.bri/2.56;
  
  var lightwaverf = new rfxcom.Lighting5(this._driver._rfxtrx, rfxcom.lighting5.LIGHTWAVERF);
  switch(data.on){
    case true:
    this._app.log.info("Switching On");
    lightwaverf.switchOn("0x" + this._device.remote_code + "/" + this._device.unit_code, {level: lev}); 
    this.emit('data','1');
    break;
    case false:
      this._app.log.info("Switching Off");
      lightwaverf.switchOff("0x" + this._device.remote_code + "/" + this._device.unit_code); 
      this.emit('data','0');
      break;
    default:
    
  }


};


Device.prototype.end = function() {
  //this._serialPort.close();
};
