import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Button} from 'app/models';
import {ButtonService, ObsWebsocketService} from 'app/services';
import { Action } from "../../../models/action";

@Component({
  selector: 'app-action-details-pane',
  templateUrl: './action-details-pane.component.html',
  styleUrls: ['./action-details-pane.component.css']
})
export class ActionDetailsPaneComponent implements OnInit {


  @Input() activeButton: Button;
  @Output() activeButtonUpdate = new EventEmitter<Button>();

  constructor(public buttonService: ButtonService,
              public obs: ObsWebsocketService) {
  }

  ngOnInit() {

  }

  addDropItem(evt) {
    if (evt instanceof Action) {
        this.activeButton.actions.push(JSON.parse(JSON.stringify(evt)));
     }
  }

  dropEventMouse(evt) {

  }

  dragEnter(evt) {

  }

  dragLeave(evt) {

  }

  dragoverMouse(evt) {

  }

  removeAction(id) {
    this.activeButton.actions.splice(id, 1);
  }
}
