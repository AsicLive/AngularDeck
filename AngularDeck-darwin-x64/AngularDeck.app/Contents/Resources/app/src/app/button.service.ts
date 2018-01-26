import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Button} from "./button";
import {ButtonType} from "./button-type";
import {FilesysService} from "./filesys.service";
import {ElectronService} from "ngx-electron";

@Injectable()
export class ButtonService {
    // Inject HttpClient into your component or service.
    FILE_NAME = "layout.json";

    private readonly URL = "http://localhost:4200/";
    private buttonResponse: Observable<Button[][]>;
    public buttonSets: Button[][] = [[]];
    private init = false;

    constructor(private filesys: FilesysService,
                private electron: ElectronService) {
        var fs = this.electron.remote.require("fs");

        try {
            this.buttonSets = JSON.parse(fs.readFileSync(this.filesys.getPath(this.FILE_NAME)));
        } catch (e) {
            if (!this.init) {
                for (let x = 0; x < 15; x++) {
                    this.buttonSets.push([]);
                    for (let y = 0; y < 15; y++) {
                        this.buttonSets[x].push(new Button(x, y));
                        if (y == 0 && x != 0) {
                            this.buttonSets[x][y].type = ButtonType.folder;
                            this.buttonSets[x][y].image = 'back.png';
                        }
                    }
                }
                this.init = true;
            }
            this.save();
        }
    }

    setButtonSet(set) {
        this.buttonSets = set;
        this.save();
    }

    getButtonSet() {
        return this.buttonSets;
    }

    public save() {
        var fs = this.electron.remote.require('fs');
        try {
            fs.writeFileSync(this.filesys.getPath(this.FILE_NAME), JSON.stringify(this.buttonSets));
        } catch (e) {
            console.log(e);
        }
    }
}
