var Device = require('./lib/device')
var util = require('util')
var stream = require('stream')
var configHandlers = require('./lib/config-handlers')
var rfxcom = require('rfxcom');


// Give our driver a stream interface
util.inherits(rfxtrx433,stream);

function rfxtrx433(opts,app) {

  var self = this;
  this._devices = {};
  this.opts = opts;
  this._app = app;
  app.on('client::up',function(){

    this.opts.devices.forEach(this.loadDevice.bind(this));
  }.bind(this));
  
  var rfxtrx = new rfxcom.RfxCom("/dev/ttyUSB0", {debug: true});
  this._rfxtrx = rfxtrx;

  this._rfxtrx.initialise(function () {
    this._app.log.info("RFX Device initialised");
  });


};

rfxtrx433.prototype.loadDevice = function(device) {
this._app.log.info('Loading Device');
this._app.log.info(device.device_name);
  if (this._devices[device.device_name]) return;
  this._devices[device.device_name] = new Device(device,this);
  this._app.log.info('Registering Device');
    this.emit('register',this._devices[device.device_name]);
};

rfxtrx433.prototype.config = function(rpc,cb) {

  var self = this;
  // If rpc is null, we should send the user a menu of what he/she
  // can do.
  // Otherwise, we will try action the rpc method
  if (!rpc) {
    return configHandlers.menu.call(this,cb);
  }
  else if (typeof configHandlers[rpc.method] === "function") {
    return configHandlers[rpc.method].call(this,rpc.params,cb);
  }
  else {
    return cb(true);
  }
};

// Export it
module.exports = rfxtrx433;
