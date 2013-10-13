var fs = require('fs')
var path = require('path')
var exp = /tty.usbserial/

exports.fetchAvailableDevices = function(fn){
  fs.readdir('/dev',function(err,devices){

    if (err)
      return fn(err)

    fn(null, filterDevices(devices))
  });
};

function filterDevices(devices) {
  return devices.filter(function(dev){
    return exp.test(dev);
  }).map(function(dev){
    return path.join('/dev',dev);
  })
};

exports.generateListObject = function(list) {

  var opt = {
    type: "input_field_select",
    field_name: "device_name",
    label: "Device",
    options: [],
    required: true
  };

  list.forEach(function(dev){
    var escapedDev = escape(dev);
       this._app.log.info(dev);
    opt.options.push({name: escapedDev, value: escapedDev, selected: false})
  })

  return opt;
};
