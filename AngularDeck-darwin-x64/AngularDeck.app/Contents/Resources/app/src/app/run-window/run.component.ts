import {Component, OnInit} from '@angular/core';
import {ButtonService} from "../button.service";
import {Configuration} from "../configuration";
import {ConfigurationService} from "../configuration.service";
import {Router} from "@angular/router";
import {ElectronService} from "ngx-electron";
import {ObsWebsocketService} from "../obs-websocket.service";
import {Button} from "../button";

@Component({
    selector: 'app-run',
    templateUrl: './run.component.html',
    styleUrls: ['./run.component.css']
})
export class RunComponent implements OnInit {

    buttonSets: Button[][] =[[]];
    activeFolder: number = 0;
    messages: String[] = [];
    config: Configuration;
    robot;

    constructor(private buttonService: ButtonService,
                private configService: ConfigurationService,
                private electronService: ElectronService,
                private obs: ObsWebsocketService,
                private router: Router) {
        this.buttonSets = this.buttonService.getButtonSet();
        this.config = this.configService.getConfig();
    }

    ngOnInit() {
        if (this.config.channelName == "") {
            this.router.navigate(['./config']);
        }

        this.startDeck();
    }

    startDeck() {

    }

    doAction(button: Button) {
        console.log(button.action.func);

        button.actions.forEach(function(elem) {
           console.log(elem);
        });
    }
}
