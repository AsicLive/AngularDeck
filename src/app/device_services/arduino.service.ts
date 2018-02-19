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
              if (data !== 'ready') {
                if (data > 0) {
                  that.device.emit('down', data);
                } else if (data < 0) {
                  that.device.emit('up', data);
                }
              } else if (data === 'ready') {
                that.connected = true;
                that.device.emit('ready');
              } else {
                that.device.emit('ready');
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

            // Arduino.write('ROBOT PLEASE RESPOND\n');
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
    console.log('Set button image');
    const that = this;
    // this.device.fillImageFromFile( this.streamDeckButton( buttonID ), imagePath );
    // Fill the third button from the left in the first row with an image of the GitHub logo.
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
        for (let i = 0; i < buffer.length; i ++) {
          newBuffer.push(buffer[i]);
        }
        return that.fillImage(buttonID, newBuffer);
        // const bit16buffer = [];
        // bit16buffer.push(73);
        // bit16buffer.push(buttonID % 5);
        // bit16buffer.push(parseInt('' + (buttonID / 5), 10));
        // for (let i = 0; i < buffer.length; i += 3) {
        //   const r = parseInt('' + (((buffer[i] + 4) * 31) / 255), 10) << 11;
        //   const g = parseInt('' + (((buffer[i + 1] + 2) * 63) / 255), 10) << 5;
        //   const b = parseInt('' + (((buffer[i + 2] + 4) * 31) / 255), 10);
        //   let bit16 = r | g | b;
        //   if ( bit16 > 65535 ) {
        //     bit16 = 65535;
        //   }
        //   let bitString = bit16.toString(2);
        //   while (bitString.length < 16) {
        //     bitString = '0' + bitString;
        //   }
        //   bit16buffer.push(parseInt(bitString.substr(0, 8), 2));
        //   bit16buffer.push(parseInt(bitString.substr(8, 8), 2));
        // }
        // return that.fillImage(buttonID, bit16buffer);
      })
      .catch(err => {
        console.error(err);
      });
  }

  fillImage(buttonID: number, imageBuffer: any) {
    if (imageBuffer !== null) {
      this.Arduino.write(imageBuffer);
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
