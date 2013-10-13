exports.menu = {
  "contents":[
    { "type": "paragraph", "text": "Welcome to the Ninja rfxtrx433 driver."},
    { "type": "submit", "name": "Add Device", "rpc_method": "add_show_menu" },
    { "type": "submit", "name": "Remove Device", "rpc_method": "remove_show_menu" },
    { "type": "submit", "name": "Clear All Devices", "rpc_method": "clear_all_devices" },
    { "type":"close", "text":"Close"}
  ]
};

exports.add_show_menu = {
  "contents":[
    { "type": "paragraph", "text": "Available devices:"},
    { "type":"input_field_text", "field_name": "device_name", "value": "", "label": "Device Name", "placeholder": "Hall Light", "required": true},
    { "type":"input_field_text", "field_name": "remote_code", "value": "", "label": "Remote Code", "placeholder": "F2C2CF", "required": true},
    { "type":"input_field_text", "field_name": "unit_code", "value": "", "label": "Unit Code", "placeholder": "1-16", "required": true},
    { "type": "submit", "name": "Add Device", "rpc_method": "add_device" },
    { "type": "close", "text":"Close"}
  ]
};

exports.remove_show_menu = {
  "contents":[
    { "type": "paragraph", "text": "Saved devices:"},
    { "type": "submit", "name": "Remove Device", "rpc_method": "remove_device" },
    { "type": "close", "text":"Close"}
  ]
};

exports.removed = {
  "contents":[
    { "type": "paragraph", "text": "That device has been removed. Please note you will still need to delete the widget on the dashboard."},
    { "type": "close", "text":"Close"}
  ]
};

exports.finish = {
  "finish": true
};
