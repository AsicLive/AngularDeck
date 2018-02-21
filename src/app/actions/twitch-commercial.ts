import {Action} from '../models/action';
import {ActionType} from 'app/models';

export class TwitchCommercial extends Action {

  name = '';
  func = '';
  category = ActionType.deck;

  getDetailsTemplate = function(action) {
    return ``;
  };

  doAction = function(that, action) {
    that.twitchService.sendMessage('/commercial ' + action.duration);
  };
}
