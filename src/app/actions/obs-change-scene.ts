import {Action} from '../models/action';
import {ActionType} from 'app/models';

export class ObsChangeScene extends Action {

  name = '';
  func = '';
  category = ActionType.deck;

  getDetailsTemplate = function (action) {
    return `<label>
              Scene:
              <select [(ngModel)]="action.scene">
                 <option *ngFor="let scene of obs._sceneList" [value]="scene.name">{{scene.name}}</option>
              </select>
            </label>`;
  };

  doAction = function (that, action) {
    that.obs.send('SetCurrentScene', {'scene-name': action.scene});
  };
}
