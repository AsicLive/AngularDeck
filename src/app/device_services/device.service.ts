import {Injectable} from "@angular/core";

@Injectable()
export abstract class DeviceService {

   device: any;

   constructor() {
      this.bindListeners();
   }

   abstract setButtonImage(buttonID: number, imagePath: any);
   abstract setButtonText(buttonID: number, text: string);
   abstract clearButton(buttonID: number);
   abstract clearAllButtons();
   abstract bindListeners();

   setButtonImageText(buttonID: number, imagePath: any, text: string) {
      this.setButtonImage(buttonID, imagePath);
      this.setButtonText(buttonID, text);
   }
}
