import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Button} from 'app/models';
import {ActionService, ButtonService, ObsWebsocketService} from 'app/services';

@Component({
  selector: 'app-action-details-pane',
  templateUrl: './action-details-pane.component.html',
  styleUrls: ['./action-details-pane.component.css']
})
export class ActionDetailsPaneComponent implements OnInit {


  @Input() activeButton: Button;
  @Output() activeButtonUpdate = new EventEmitter<Button>();

  constructor(public actionService: ActionService,
              private buttonService: ButtonService,
              private obs: ObsWebsocketService) {
  }

  ngOnInit() {

  }

  getActionTemplate(action) {
    console.log(action.func);
    console.log(this.actionService.actions[action.func]);
    console.log(this.actionService.actions);
    return '';
    // return this.actionService.actions[action.func].getDetailsTemplate(action);
  }

  addDropItem(evt) {
    this.activeButton.actions.push(JSON.parse(JSON.stringify(evt)));
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
