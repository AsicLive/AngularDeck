import {Injectable} from '@angular/core';
import {ConfigurationService} from './configuration.service';
let tmi = require('tmi.js');

@Injectable()
export class TwitchService {

  channelName = '';
  running = false;
  client: any = null;

  constructor(public configService: ConfigurationService) {
    // this.connect();
  }

  connect() {
    this.channelName = '#' + this.configService.config.channelName.toLowerCase();

    const options = {
      options: {
        debug: true
      },
      connection: {
        secure: true,
        reconnect: true
      },
      identity: {
        username: this.configService.config.channelName,
        password: this.configService.config.twitchChatKey
      },
      channels: [this.channelName]
    };
    this.client = new tmi.client(options);

    this.client.connect();
  }

  disconnect() {
    this.client.disconnect();
  }

  sendMessage(msg) {
    this.client.say(this.channelName, msg);
  }

  toggleFollowerMode(minutes: number = 30) {
    const that = this;
    this.client.followersonly(this.channelName, minutes).then(function (data) {
      // data returns [channel]
    }).catch(function (err) {
      that.client.followeronlyoff(that.channelName);
    });
  }

  toggleSubMode(minutes: number = 30) {
    const that = this;
    this.client.subscribers(this.channelName, minutes).then(function (data) {
      // data returns [channel]
    }).catch(function (err) {
      that.client.subscribersoff(that.channelName);
    });
  }

  toggleEmoteMode(minutes) {
    const that = this;
    this.client.emoteonly(this.channelName, minutes).then(function (data) {
      // data returns [channel]
    }).catch(function (err) {
      that.client.emoteonlyoff(this.channelName);
    });
  }

  toggleSlowMode(seconds = 300) {
    const that = this;
    this.client.slow(this.channelName, seconds).then(function (data) {
      // data returns [channel]
    }).catch(function (err) {
      that.client.slowOff(this.channelName);
    });
  }
}
