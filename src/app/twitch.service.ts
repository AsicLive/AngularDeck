import { Injectable } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
var tmi = require("tmi.js");

@Injectable()
export class TwitchService {

   channelName: string = "";
   running: boolean = false;
   client: any = null;

   constructor(public configService: ConfigurationService) {
      this.channelName = "#" + configService.config.channelName.toLowerCase();

      let running = false;

      var options = {
         options: {
            debug: true
         },
         connection: {
            secure: true,
            reconnect: true
         },
         identity: {
            username: configService.config.channelName,
            password: configService.config.twitchChatKey
         },
         channels: [ this.channelName ]
      };
      this.client = new tmi.client( options );

      this.client.connect();
   }

   sendMessage(msg) {
      this.client.say(this.channelName, msg);
   }

   toggleFollowerMode(minutes: number = 30) {
      let that = this;
      this.client.followersonly(this.channelName, minutes).then(function(data) {
         // data returns [channel]
      }).catch(function(err) {
         that.client.followeronlyoff(that.channelName);
      });
   }

   toggleSubMode(minutes: number = 30) {
      let that = this;
      this.client.subscribers(this.channelName, minutes).then(function(data) {
         // data returns [channel]
      }).catch(function(err) {
         that.client.subscribersoff(that.channelName);
      });
   }

   toggleEmoteMode(minutes) {
      let that = this;
      this.client.emoteonly(this.channelName, minutes).then(function(data) {
         // data returns [channel]
      }).catch(function(err) {
         that.client.emoteonlyoff(this.channelName);
      });
   }

   toggleSlowMode(seconds = 300) {
      let that = this;
      this.client.slow(this.channelName, seconds).then(function(data) {
         // data returns [channel]
      }).catch(function(err) {
         that.client.slowOff(this.channelName);
      });
   }
}
