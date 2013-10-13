var configMessages = require('./config-messages')
var helpers = require('./helpers')

exports.menu = function(cb) {

  cb(null,configMessages.menu)
};

exports.add_show_menu = function(params,cb) {
 // helpers.fetchAvailableDevices(function(err,devices){

  //  if (err)
    //  return cb(err);

    // Clone the array in messages
  var returnPayload = configMessages.add_show_menu.contents.splice(0)
  //  var listJSON = helpers.generateListObject(devices)

    // Insert listJSON as the 2nd element of returnPayload
    //returnPayload.splice(1,0,listJSON)

    var compiled = {
      contents:returnPayload
    }

    
  //});
  cb(null,compiled)
};

exports.add_device = function(params,cb) {
   this._app.log.info('Add device params:');
      this._app.log.info(params);
  if (!params.device_name)
    return cb(true);

  var device = unescape(params);
   
  if (this.opts.devices.indexOf(params)===-1) {
    //this.loadDevice(device);
    this.opts.devices.push(params);
    this.save();
    this._app.log.info('Add device - saved');
  }

  cb(null,configMessages.finish);
};

exports.remove_show_menu = function(params,cb) {

  // Clone the array in messages
  var returnPayload = configMessages.remove_show_menu.contents.splice(0)
  this._app.log.info(this.opts.devices);
  var listJSON = helpers.generateListObject(this.opts.devices);
  this._app.log.info(listJSON);
  returnPayload.splice(1,0,listJSON)

  var compiled = {
    contents:returnPayload
  }

  cb(null,compiled)
};

exports.remove_device = function(params,cb) {
  if (!params.device)
    return cb(true)

  var unescapedDevicePath = unescape(params.device)
  var i = this.opts.devices.indexOf(unescapedDevicePath)
  this.opts.devices.splice(i,1)

  try {
    this._devices[unescapedDevicePath].end();
  } catch (err) {
    console.error('ninja-rfxtrx433',err);
  }

  this.save()
  cb(null,configMessages.removed);
};
