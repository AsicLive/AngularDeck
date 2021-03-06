import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Button, ButtonType} from 'app/models';
import {FilesysService} from './filesys.service';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class ButtonService {
    // Inject HttpClient into your component or service.
    FILE_NAME = 'layout.json';

    private readonly URL = 'http://localhost:4200/';
    private buttonResponse: Observable<Button[][]>;
    public folder = 0;
    public buttonSets: Button[][] = [[]];
    private init = false;

    constructor(private filesys: FilesysService,
                private electron: ElectronService) {
        const fs = this.electron.remote.require('fs');

        try {
            this.buttonSets = JSON.parse(fs.readFileSync(this.filesys.getPath(this.FILE_NAME)));
        } catch (e) {
            if (!this.init) {
                for (let x = 0; x < 15; x++) {
                    this.buttonSets.push([]);
                    for (let y = 0; y < 15; y++) {
                        this.buttonSets[x].push(new Button(x, y));
                        if (y === 0 && x !== 0) {
                            this.buttonSets[x][y].type = ButtonType.folder;
                            this.buttonSets[x][y].image.default_path = '/assets/img/back.png';
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

    getCurrentFolder() {
        return this.getFolder(this.folder);
    }

    getFolder(id) {
        return this.buttonSets[id];
    }

    getButtonSet() {
        return this.buttonSets;
    }

    openFolder(folder) {
        this.folder = folder;
        return this.getCurrentFolder();
    }

    public save() {
        const fs = this.electron.remote.require('fs');
        try {
            fs.writeFileSync(this.filesys.getPath(this.FILE_NAME), JSON.stringify(this.buttonSets));
        } catch (e) {
            console.log(e);
        }
    }
}
