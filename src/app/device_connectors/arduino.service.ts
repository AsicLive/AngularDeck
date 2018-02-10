import { Injectable } from '@angular/core';
import { DeviceService } from "./device.service";

const StreamDeck = require( 'elgato-stream-deck' );

@Injectable()
export class Arduino_unoService extends DeviceService {

   constructor() {
      super();
      var SerialPort = require( 'serialport' );

      var baud = 9600;
      var delimiter = '\r\n';
      var comName = '';

      SerialPort.list( function ( err, ports ) {
         ports.forEach( function ( port ) {
            if ( port.manufacturer && port.manufacturer.indexOf( "Arduino" ) != -1 ) { //connect to the first device we see that has "Arduino" in the manufacturer name
               comName = port.comName;

               var Arduino = new SerialPort( comName, {
                  parser: SerialPort.parsers.readline( delimiter ),
                  baudRate: baud
               } );

               Arduino.on( 'open', function () {
                  console.log( "Port " + comName + " opened." );
               } );

               Arduino.on( 'data', function ( data ) {
                  console.log( data.toString() );
               } );

               Arduino.on( 'error', function ( err ) {
                  console.log( err );
               } );

            }
         } );
      } );
   }
}
