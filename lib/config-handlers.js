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

  if (!params.device)
    return cb(true);

  var device = unescape(params.device);

  if (this.opts.devices.indexOf(params.device)===-1) {
    this.loadDevice(device);
    this.opts.devices.push(device);
    this.save();
  }

  cb(null,configMessages.finish);
};

exports.remove_show_menu = function(params,cb) {

  // Clone the array in messages
  var returnPayload = configMessages.remove_show_menu.contents.splice(0)
  var listJSON = helpers.generateListObject(this.opts.devices);
  console.info(listJSON);
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
