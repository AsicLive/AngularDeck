import { ButtonType } from './button-type';
import { DeckAction } from './deck-action';
import { Image } from './image';

export class Button {
    set: number;
    id: number;
    type: ButtonType;
    image: Image;
    imageBase64: string;
    actions: DeckAction[];
    state: any = 'small';

    constructor(set, id) {
        this.set = set;
        this.id = id;
        this.image = new Image;
        this.type = ButtonType.action;
        this.actions = new Array<DeckAction>();
        this.imageBase64 = null;
    }
}
