const {app, BrowserWindow} = require('electron')
const path = require('path');
const url = require('url');

require('dotenv').config();

require('electron-reload')(__dirname);

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 300,
        height: 900,
        backgroundColor: '#FFF',
        webPreferences: {
            webSecurity: false
        }
    });

    if (process.env.PACKAGE === 'true'){
        win.loadURL(`file://${__dirname}/dist/index.html`);
    } else {
        win.loadURL(process.env.HOST);
        //win.loadURL(`file://${__dirname}/dist/index.html`);
        win.webContents.openDevTools();
    }


    win.on('closed', function () {
        win = null;
    })

}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});

// var config = require('./src/config.json');
// var tmi = require("tmi.js");
//var SerialPort = require('serialport');
// var OBSWebSocket = require('obs-websocket-js');

// var baud = 9600;
// var delimiter = '\r\n';
// var comName = '';

//Serial connection to Arduino

// SerialPort.list(function (err, ports) {
//     ports.forEach(function (port) {
//         if (port.manufacturer && port.manufacturer.indexOf("Arduino") != -1) { //connect to the first device we see that has "Arduino" in the manufacturer name
//             comName = port.comName;
//
//             var Arduino = new SerialPort(comName, {
//                 parser: SerialPort.parsers.readline(delimiter),
//                 baudRate: baud
//             });
//
//             Arduino.on('open', function () {
//                 console.log("Port " + comName + " opened.");
//             });
//
//             Arduino.on('data', function (data) {
//                 console.log(data.toString());
//             });
//
//             Arduino.on('error', function (err) {
//                 console.log(err);
//             });
//
//         }
//     });
// });

//Twitch Message Interface

// let channelName = "#" + config.channelName.toLowerCase();
//
// let running = false;
//
// var options = {
//     options: {
//         debug: true
//     },
//     connection: {
//         secure: true,
//         reconnect: true
//     },
//     identity: {
//         username: config.channelName,
//         password: config.twitchChatKey
//     },
//     channels: [channelName]
// };
// var client = new tmi.client(options);
//
// client.connect();
// setTimeout(function() {
//     //client.say(channelName, "Hello");
// }, 1000);


// var obs = new OBSWebSocket();
// obs.connect({ address: '192.168.1.110:4444', password: '' }).then(() => {
//     console.log('Success! We\'re connected & authenticated.');
//     return obs.getSceneList({});
// })
//     .then(data => {
//         console.log(`${data.scenes.length} Available Scenes!`);
//         data.scenes.forEach(scene => {
//             if (scene.name !== data.currentScene) {
//                 console.log('Found a different scene! Switching to Scene:', scene.name);
//                 obs.setCurrentScene({'scene-name': scene.name});
//             }
//         });
//     })
//     .catch(err => { // Ensure that you add a catch handler to every Promise chain.
//         console.log(err);
//     });
