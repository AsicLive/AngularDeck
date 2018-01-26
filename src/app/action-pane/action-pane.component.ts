import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DECK_SET, MEDIA_SET, OBS_SET, SYS_SET, TWITCH_SET} from "../const-actions";
import {Button} from "../button";

@Component({
    selector: 'app-action-pane',
    templateUrl: './action-pane.component.html',
    styleUrls: ['./action-pane.component.css']
})
export class ActionPaneComponent implements OnInit {

    deck = DECK_SET;
    twitch = TWITCH_SET;
    obs = OBS_SET;
    media = MEDIA_SET;
    sys = SYS_SET;

    @Input() activeButton: Button;
    @Output() activeButtonUpdate: EventEmitter<Button>;

    constructor() {
        this.activeButtonUpdate = new EventEmitter<Button>();
    }

    ngOnInit() {
    }

    updateAction(action) {
        this.activeButton.action = JSON.parse(JSON.stringify(action));
        this.activeButtonUpdate.emit(this.activeButton);
    }

    releaseDrop(evt) {

    }

    startDrag(action) {

    }
}
