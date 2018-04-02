import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Button, Image } from 'app/models';
import { ImageLibraryService } from "app/services";
import { ElectronService } from "ngx-electron";
import { FilesysService } from "../../../services/filesys.service";

@Component( {
   selector: 'app-image-pane',
   templateUrl: './image-pane.component.html',
   styleUrls: [ './image-pane.component.css' ]
} )
export class ImagePaneComponent implements OnInit {

   ICON_WIDTH = 72;
   ICON_HEIGHT = 72;

   @Input() activeButton: Button;
   @Output() activeButtonUpdate: EventEmitter<Button>;
   @ViewChild('filePickerDefault') filePickerDefault: any;
   @ViewChild('filePickerToggled') filePickerToggled: any;

   activeImage: Image = null;

   images: Image[] = [];

   constructor(public imageService: ImageLibraryService,
               public electronService: ElectronService,
               public fileSysService: FilesysService) {
      this.images = imageService.images;
   }

   ngOnInit() {
   }

   updateImage(image) {
      this.activeImage = image;
   }

   newImage() {
      this.activeImage = new Image();
      this.imageService.images.push(this.activeImage);
   }

   handleFileSelect(evt, type) {
      const files = evt.target.files;
      const file = files[0];
      const nativeImage = this.electronService.nativeImage;
      const fs = this.electronService.remote.require('fs');

      if (files && file) {
         const reader = new FileReader();

         reader.onload = this._handleReaderLoaded.bind(this);

         reader.readAsBinaryString(file);

         console.log('File: ', file);

         const uuid = require("uuid");
         const fileName = uuid.v4().substr(0, 8) + '.png';
         const filePath = this.fileSysService.getPath(fileName, 'icons');

         let image = nativeImage.createFromPath(file.path);
         image = image.resize({width: this.ICON_WIDTH, height: this.ICON_HEIGHT});
         const pngBuffer = image.toPNG();

         try {
            console.log(filePath);
            fs.writeFileSync(filePath, pngBuffer);
         } catch (e) {
            console.log(e);
         }
         if (type == 'default') {
            this.activeImage.default_path = filePath;
            this.filePickerDefault.nativeElement.value = '';
         } else if (type == 'toggled') {
            this.activeImage.toggled_path = filePath;
            this.filePickerToggled.nativeElement.value = '';
         } else {
            console.log('Why is this wrong?');
            this.activeImage.default_path = filePath;
            this.filePickerDefault.nativeElement.value = '';
            this.filePickerToggled.nativeElement.value = '';
         }
      }
   }

   _handleReaderLoaded(readerEvt) {
      // const binaryString = readerEvt.target.result;
      // this.activeButton.imageBase64 = 'data:image/bmp;base64,' + String(btoa(binaryString));
   }

   releaseDrop(evt) {

   }

   startDrag(action) {

   }


   dropEventMouse(evt) {

   }

   dragEnter(evt) {

   }

   dragLeave(evt) {

   }

   dragoverMouse(evt) {

   }

}
