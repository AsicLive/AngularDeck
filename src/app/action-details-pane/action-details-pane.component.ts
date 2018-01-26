import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Button} from "../button";
import {ButtonService} from "../button.service";
import {ObsWebsocketService} from "../obs-websocket.service";

@Component({
    selector: 'app-action-details-pane',
    templateUrl: './action-details-pane.component.html',
    styleUrls: ['./action-details-pane.component.css']
})
export class ActionDetailsPaneComponent implements OnInit {


    @Input() activeButton: Button;
    @Output() activeButtonUpdate = new EventEmitter<Button>();

    constructor(private buttonService: ButtonService,
                private obs: ObsWebsocketService) {
    }

    ngOnInit() {

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
