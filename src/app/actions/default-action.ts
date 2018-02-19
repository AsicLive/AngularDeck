import {Action} from '../models/action';
import {ActionType} from 'app/models';

export class DefaultAction extends Action {

  name = '';
  func = '';
  category = ActionType.deck;

  getDetailsTemplate(action) {
    return ``;
  }

  doAction(that, action) {

  }
}
