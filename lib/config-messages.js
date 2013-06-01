exports.menu = {
  "contents":[
    { "type": "paragraph", "text": "Welcome to the Ninja XBee driver."},
    { "type": "submit", "name": "Add Device", "rpc_method": "add_show_menu" },
    { "type": "submit", "name": "Remove Device", "rpc_method": "remove_show_menu" },
    { "type":"close", "text":"Close"}
  ]
};

exports.add_show_menu = {
  "contents":[
    { "type": "paragraph", "text": "Available devices:"},
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
