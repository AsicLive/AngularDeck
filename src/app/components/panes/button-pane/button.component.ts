import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Url} from 'url';
import {Button} from 'app/models';
import {ButtonService, ConfigurationService, ObsWebsocketService} from 'app/services';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-button-pane',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  buttonSets: Button[][] = [[]];
  selectedButton: Button;
  activeFolder = 0;
  @Output() activeButtonUpdate: EventEmitter<Button>;
  selectedButtonFile: String = '';
  downloadLayout: Url;

  constructor(private buttonService: ButtonService,
              private configService: ConfigurationService,
              private sanitizer: DomSanitizer,
              private electronService: ElectronService,
              private obs: ObsWebsocketService) {
    this.selectedButton = new Button(-1, -1);
    this.buttonSets = this.buttonService.getButtonSet();
    this.activeButtonUpdate = new EventEmitter<Button>();

  }

  ngOnInit() {
    this.selectButton(this.buttonSets[0][0]);
  }

  selectButton(button) {
    this.selectedButton = button;
    this.activeButtonUpdate.emit(this.selectedButton);
  }

  exportButtons() {
    this.generateDownloadJsonUri();
  }

  saveButtons() {
    // Save a default option.
    this.buttonService.save();
  }

  buttonImage(button) {
    // return this.buttonService.buttonImages[button.set][button.id];
  }

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    const tempSet = JSON.parse(binaryString);

    this.buttonSets = tempSet;
    this.buttonService.setButtonSet(tempSet);

    // Replace our default file with the most recently uploaded.
    this.buttonService.save();
  }

  generateDownloadJsonUri() {
    const dialog = this.electronService.remote.dialog;
    const fs = this.electronService.remote.require('fs');
    let theJSON = JSON.stringify(this.buttonSets);

    if (this.electronService.isElectronApp) {
      dialog.showSaveDialog({title: 'layout.json', defaultPath: 'layout.json'}, function (fileName) {
        if (fileName === undefined) {
          return;
        }

        fs.writeFile(fileName, theJSON, function (err) {
          if (err) {
            console.log(err);
          }
        });
      });
    } else {
      theJSON = JSON.stringify(this.buttonSets);
      const uri = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON));
      this.downloadLayout = uri;
    }
  }

   addDropItem(button: Button, evt) {
      button.image = JSON.parse(JSON.stringify(evt));
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
