import {Action} from '../models/action';
import {ActionType} from 'app/models';

export class TwitchEmote extends Action {

  name = '';
  func = '';
  category = ActionType.deck;

  getDetailsTemplate = function(action) {
    return ``;
  };

  doAction = function(that, action) {
    that.twitchService.toggleEmoteMode(action.minutes);
  };
}
