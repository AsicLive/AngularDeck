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

}
