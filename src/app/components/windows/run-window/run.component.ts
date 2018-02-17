import {Component, OnInit, OnDestroy, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {Button, Configuration} from 'app/models';
import {ArduinoService} from 'app/device_services';
import {ButtonService, ConfigurationService, KeysenderService, ObsWebsocketService, TwitchService} from 'app/services';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-run-pane',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.css']
})
export class RunComponent implements OnInit, OnDestroy {

  buttons: Button[] = [];
  activeFolder = 0;
  messages: String[] = [];
  config: Configuration;

  delayed = false;
  queuedActions = [];
  lastIndex = 0;

  constructor(public twitchService: TwitchService,
              public buttonService: ButtonService,
              public configService: ConfigurationService,
              public electronService: ElectronService,
              public obs: ObsWebsocketService,
              public ks: KeysenderService,
              public router: Router,
              public renderer: Renderer2,
              public arduino: ArduinoService) {
    this.buttons = this.buttonService.getCurrentFolder();
    this.config = this.configService.getConfig();
  }

  ngOnInit() {
    const that = this;

    if (this.config.channelName === '') {
      this.router.navigate(['./config']);
    }
    this.twitchService.connect();
    this.arduino.connect();

    this.arduino.device.on('ready', function() {
      that.fillImages();
    });

    this.arduino.device.on('down', function (keyIndex) {
      that.doAction(that.buttons[keyIndex - 1]);
    });
  }

  ngOnDestroy() {
    this.twitchService.disconnect();
    this.arduino.close();
  }

  startDeck() {

  }

  fillImages() {
    const that = this;
    this.buttons.forEach(function(elem, buttonID) {
      that.arduino.setButtonImage(buttonID, elem.image);
    });
  }

  doAction(button: Button, event = null) {
    const that = this;

    if (event) {
      const target = event.target || event.srcElement || event.currentTarget;
      this.renderer.addClass(target.parentElement, 'clicked');
      window.setTimeout(function () {
        that.renderer.removeClass(target.parentElement, 'clicked');
      }, 300);
    }

    button.actions.forEach(function (elem, index) {
      const fn = that[elem.func];
      if (typeof fn === 'function' && that.delayed === false) {
        fn(that, elem);
      } else if (typeof fn === 'function' && that.delayed === true) {
        that.queuedActions.push(elem);
      }
    });
  }

  continueAction(that) {
    const delayed = false;
    const myActions = JSON.parse(JSON.stringify(this.queuedActions));
    this.queuedActions = [];

    myActions.forEach(function (elem, index) {
      const fn = that[elem.func];
      if (typeof fn === 'function' && that.delayed === false) {
        fn(that, elem);
      } else if (typeof fn === 'function' && that.delayed === true) {
        that.queuedAction.push(elem);
      }
    });
  }

  deck_delay(that, action) {
     that.delayed = true;
     setTimeout(function () {
        that.delayed = false;
        that.continueAction(that);
     }, +action.timeout);
  }

  deck_folder(that, action) {
    that.buttons = that.buttonService.openFolder(action.folder);
  }

  twitch_subs(that, action) {
    // that.twitchService.sendMessage( '/subscribers' );
    that.twitchService.toggleSubMode(action.minutes);
  }

  twitch_emote(that, action) {
    // that.twitchService.sendMessage( '/emoteonly' );
    that.twitchService.toggleEmoteMode(action.minutes);
  }

  twitch_followers(that, action) {
    // that.twitchService.sendMessage( '/followers' );
    that.twitchService.toggleFollowerMode(action.minutes);
  }

  twitch_slow(that, action) {
    // that.twitchService.sendMessage( '/slow ' + action.seconds );
    that.twitchService.toggleSlowMode(action.seconds);
  }

  twitch_commercial(that, action) {
    that.twitchService.sendMessage('/commercial ' + action.duration);
  }

  twitch_custom_message(that, action) {
    that.twitchService.sendMessage(action.message);
  }

  obs_toggle_streaming(that, action) {
    // TODO

  }

  obs_toggle_recording(that, action) {
    // TODO

  }

  obs_toggle_mic(that, action) {
    // TODO

  }

  obs_change_scene(that, action) {
    that.obs.send('SetCurrentScene', {'scene-name': action.scene});
  }

  obs_toggle_source(that, action) {
    // TODO

  }

  media_play_pause(that, action) {
    that.ks.ks.keyTap('audio_play');
  }

  media_prev_track(that, action) {
    that.ks.ks.keyTap('audio_prev');
  }

  media_next_track(that, action) {
    that.ks.ks.keyTap('audio_next');
  }

  media_mute(that, action) {
    that.ks.ks.keyTap('audio_mute');
  }

  media_stop(that, action) {
    that.ks.ks.keyTap('audio_stop');
  }

  media_vol_up(that, action) {
    that.ks.ks.keyTap('audio_vol_up');
  }

  media_vol_down(that, action) {
    that.ks.ks.keyTap('audio_vol_down');
  }

  sys_hotkey(that, action) {
    that.ks.ks.sendCombination(['windows', 'r']);
  }
}
