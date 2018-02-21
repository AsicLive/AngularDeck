import {Action} from '../models/action';
import {ActionType} from 'app/models';

export class DeckDelay extends Action {

  name = 'Action Delay';
  func = 'deck_delay';
  category = ActionType.deck;

  getDetailsTemplate = function (action) {
    return `<label>
                  Timeout in ms:
                  <input [(ngModel)]='action.timeout'>
              </label>`;
  };

  doAction = function (that, action) {
    that.delayed = true;
    setTimeout(function () {
      that.delayed = false;
      that.continueAction(that);
    }, +action.timeout);
  };
}
