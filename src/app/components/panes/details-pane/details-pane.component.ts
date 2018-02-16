import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Button, ButtonType} from 'app/models';
import {ElectronService} from 'ngx-electron';
import {FilesysService} from 'app/services';

@Component({
  selector: 'app-details-pane',
  templateUrl: './details-pane.component.html',
  styleUrls: ['./details-pane.component.css']
})
export class DetailsPaneComponent implements OnInit {

  ICON_WIDTH = 72;
  ICON_HEIGHT = 72;

  @Input() activeButton: Button;
  @Output() activeButtonUpdate = new EventEmitter<Button>();
  @Input() activeFolder: Number;
  @Output() activeFolderUpdate = new EventEmitter<number>();
  private base64textString: String = '';
  selectedImageFile = '';

  keys(): Array<string> {
    const keys = Object.keys(ButtonType);
    return keys.slice(keys.length / 2);
  }

  constructor(private electronService: ElectronService,
              private fileSysService: FilesysService) {
    this.activeButton = new Button(-1, -1);
  }

  ngOnInit() {
  }

  changeFolder() {
    this.activeFolderUpdate.emit(this.activeButton.id);
  }

  changeButtonType(type) {
    this.activeButton.type = type;
  }

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];
    const nativeImage = this.electronService.nativeImage;
    const fs = this.electronService.remote.require('fs');

    if (files && file) {
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);

      console.log('File: ', file);

      const fileName = ('0' + ((this.activeButton.set * 16) + this.activeButton.id).toString(16)).substr(-2) + '.png';
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
      this.activeButton.image = filePath;
    }
  }

  _handleReaderLoaded(readerEvt) {
    // const binaryString = readerEvt.target.result;
    // this.activeButton.imageBase64 = 'data:image/bmp;base64,' + String(btoa(binaryString));
  }
}
