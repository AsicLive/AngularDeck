/*jshint bitwise: false*/
import {Injectable} from '@angular/core';
import {DeviceService} from './device.service';
import {ElectronService} from 'ngx-electron';

const EventEmitter = require('events');

@Injectable()
export class ArduinoService extends DeviceService {

  ICON_SIZE = 58;

  baud = 57600;
  delimiter = '\r\n';
  comName = '';

  Arduino = null;

  device;
  buffer;

  connected = false;

  isWritingBuffers = false;
  pendingBuffers: any = [];

  constructor(public electron: ElectronService) {
    super();
    this.device = new EventEmitter();
  }

  connect() {
    if (this.Arduino == null) {
      const SerialPort = this.electron.remote.require('serialport');
      this.buffer = SerialPort.Buffer;
      const parser = new SerialPort.parsers.Readline({
        delimiter: this.delimiter
      });
      const that = this;

      SerialPort.list(function (err, ports) {
        ports.forEach(function (port) {
          if (port.manufacturer && port.manufacturer.indexOf('Arduino') !== -1) {
            // connect to the first device we see that has 'Arduino' in the manufacturer name.
            that.comName = port.comName;

            that.Arduino = new SerialPort(that.comName, {
              baudRate: that.baud
            });

            that.Arduino.pipe(parser);
            that.Arduino.on('open', () => console.log('Port open'));

            parser.on('data', (data) => {
              console.log(data);
              if (data === 'ready') {
                that.connected = true;
                that.device.emit('ready');
              } else if (data === 'done') {
                that.isWritingBuffers = false;
                that.startWritingPendingBuffers();
              } else {
                if (data > 0) {
                  that.device.emit('down', data);
                } else if (data < 0) {
                  that.device.emit('up', data);
                } else {
                  console.log('Error in Data: ', data);
                }
              }
            });

            that.Arduino.on('open', function () {
              console.log('Port ' + that.comName + ' opened.');
            });

            that.Arduino.on('error', (error) => {
              console.log(error.message);
              that.Arduino.close();
              process.exit(1);
            });
          }
        });
      });
    }
  }

  close() {
    if (this.Arduino != null) {
      this.Arduino.close();
      this.Arduino = null;
    }
  }

  setButtonImage(buttonID: number, imagePath: any) {
    const that = this;
    const sharp = this.electron.remote.require('sharp'); // See http://sharp.dimens.io/en/stable/ for full docs on this great library!
    sharp(imagePath)
      .flatten() // Eliminate alpha channel, if any.
      .resize(that.ICON_SIZE, that.ICON_SIZE) // Scale up/down to the right size, cropping if necessary.
      .raw() // Give us uncompressed RGB.
      .toBuffer()
      .then(buffer => {
        const newBuffer = [];
        newBuffer.push(73);
        newBuffer.push(buttonID % 5);
        newBuffer.push(parseInt('' + (buttonID / 5), 10));
        for (let i = 0; i < buffer.length; i++) {
          newBuffer.push(buffer[i]);
        }
        return that.fillImage(buttonID, newBuffer);
      })
      .catch(err => {
        console.error(err);
      });
  }

  fillImage(buttonID: number, imageBuffer: any) {
    if (imageBuffer !== null) {
      this.pendingBuffers.push(imageBuffer);
      this.startWritingPendingBuffers();
    }
  }

  startWritingPendingBuffers() {
    if (this.isWritingBuffers === false && this.pendingBuffers.length > 0) {
      this.isWritingBuffers = true;
      this.Arduino.write(this.pendingBuffers.shift());
    }
  }

  setButtonText(buttonID: number, text: string) {
    // TODO
  }

  clearButton(buttonID: number) {
    // this.device.clearKey( this.streamDeckButton( buttonID ) );
  }


  clearAllButtons() {
    // this.device.clearAllKeys();
  }

  bindListeners() {
  }

}
