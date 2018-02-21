import {Action} from '../models/action';
import {ActionType} from 'app/models';

export class MediaStop extends Action {

  name = '';
  func = '';
  category = ActionType.deck;

  getDetailsTemplate = function(action) {
    return ``;
  };

  doAction = function(that, action) {
    that.ks.ks.keyTap('audio_stop');
  };
}
