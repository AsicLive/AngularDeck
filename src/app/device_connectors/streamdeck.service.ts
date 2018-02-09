import { Injectable } from '@angular/core';
import { DeviceService } from "./device.service";

const StreamDeck = require( 'elgato-stream-deck' );

@Injectable()
export class StreamDeckService extends DeviceService {

   device: any;

   // We need this to remap button ids because the Elgato scans right to left, top to bottom. Normal sequence is left to right, top to bottom.
   buttonToStreamDeckButtonID = [
      4, 3, 2, 1, 0, 9, 8, 7, 6, 5, 14, 13, 12, 11, 10
   ];

   constructor() {
      super();
      this.device = new StreamDeck();
   }

   setButtonImage( buttonID: number, imagePath: any ) {
      this.device.fillImageFromFile( this.streamDeckButton( buttonID ), imagePath );
   }

   setButtonText( buttonID: number, text: string ) {
      // TODO
   }

   clearButton( buttonID: number ) {
      this.device.clearKey( this.streamDeckButton( buttonID ) );
   }


   clearAllButtons() {
      this.device.clearAllKeys();
   }

   bindListeners() {
      this.device.on( 'down', keyIndex => {
         // TODO
      } );

      this.device.on( 'up', keyIndex => {
         // TODO
      } );

      this.device.on( 'error', error => {
         console.log( error );
      } );
   }

   streamDeckButton( buttonID ) {
      if ( (buttonID >= 0) && (buttonID <= 14) ) {
         return this.buttonToStreamDeckButtonID[ buttonID ];
      } else {
         throw new Error( 'Invalid buttonID' );
      }
   }
}
