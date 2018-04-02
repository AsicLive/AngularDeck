import { Injectable } from '@angular/core';
import { Image } from 'app/models';
import { FilesysService } from "./filesys.service";
import { ElectronService } from "ngx-electron";
import { ArduinoService } from "app/device_services/arduino.service";

@Injectable()
export class ImageLibraryService {

   public FILE_NAME = 'images.json';
   images: Image[] = [];

   constructor( public filesys: FilesysService,
                public electron: ElectronService,
                public arduinoService: ArduinoService) {
      const fs = this.electron.remote.require( 'fs' );
      try {
         this.images = JSON.parse( fs.readFileSync( this.filesys.getPath( this.FILE_NAME ) ) );
      } catch ( e ) {
         this.save();
      }
   }

   public getConfig() {
      if ( this.images != null ) {
         return this.images;
      } else {
         return [];
      }
   }

   public removeImage( index ) {
      const fs = this.electron.remote.require('fs');
      const image: Image = JSON.parse( JSON.stringify( this.images[ index ] ) );
      this.images.splice(index, 1);
      if (image.default_path != null) {
         fs.unlink( image.default_path );
      }
      if (image.toggled_path != null) {
         fs.unlink(image.toggled_path);
      }

   }

   public save() {
      const fs = this.electron.remote.require( 'fs' );
      try {
         fs.writeFileSync( this.filesys.getPath( this.FILE_NAME ), JSON.stringify( this.images ) );
      } catch ( e ) {
         console.log( e );
      }
   }

}
