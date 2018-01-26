import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class FilesysService {

    public os;
    public platform;
    public homeDir;
    public configDir;
    public dirSeparator;

    constructor(private electronService: ElectronService) {
        var os = this.electronService.remote.require("os");
        var fs = this.electronService.remote.require("fs");
        this.homeDir = os.homedir();
        var user = os.userInfo().username;
        switch (os.platform()) {
            case 'darwin':
                this.configDir = '/Users/' + user + '/.AngularDeck/';
                this.dirSeparator = '/';
                break;
            case 'linux':
                //TODO: Not sure where to store things on Linux
                this.configDir = '~/.config/AngularDeck/';
                this.dirSeparator = '/';
                break;
            case 'win32':
                this.configDir = 'C:\\Users\\' + user + '\\Application Data\\Local\\AngularDeck\\';
                this.dirSeparator = '\\';
                break;
        }
        if (!fs.existsSync(this.configDir)) {
            fs.mkdirSync(this.configDir);
        }
    }

    getPath(fileName, dir: any = false) {
        var fs = this.electronService.remote.require("fs");

        if (!dir) {
            return this.configDir + fileName;
        } else {
            var dirDir = this.configDir + dir + this.dirSeparator;
            if (!fs.existsSync(dirDir)) {
                fs.mkdirSync(dirDir);
            }
            return dirDir + fileName;
        }
    }
}
