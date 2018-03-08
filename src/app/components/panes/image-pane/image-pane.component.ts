import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Button } from 'app/models';
import { ImageLibraryService } from "../../../services/image-library.service";

@Component( {
   selector: 'app-image-pane',
   templateUrl: './image-pane.component.html',
   styleUrls: [ './image-pane.component.css' ]
} )
export class ImagePaneComponent implements OnInit {

   @Input() activeButton: Button;
   @Output() activeButtonUpdate: EventEmitter<Button>;

   constructor(public images: ImageLibraryService) {
   }

   ngOnInit() {
   }

}
