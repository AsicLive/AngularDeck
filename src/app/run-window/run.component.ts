import { Component, OnInit } from '@angular/core';
import { ButtonService } from "../button.service";
import { Configuration } from "../configuration";
import { ConfigurationService } from "../configuration.service";
import { Router } from "@angular/router";
import { ElectronService } from "ngx-electron";
import { ObsWebsocketService } from "../obs-websocket.service";
import { Button } from "../button";
import { TwitchService } from "../twitch.service";
import { KeysenderService } from "../keysender.service";

@Component( {
   selector: 'app-run-pane',
   templateUrl: './run.component.html',
   styleUrls: [ './run.component.css' ]
} )
export class RunComponent implements OnInit {

   buttons: Button[] = [];
   activeFolder: number = 0;
   messages: String[] = [];
   config: Configuration;

   delayed = false;
   queuedActions = [];
   lastIndex = 0;

   robot;

   constructor( public twitchService: TwitchService,
                public buttonService: ButtonService,
                public configService: ConfigurationService,
                public electronService: ElectronService,
                public obs: ObsWebsocketService,
                public ks: KeysenderService,
                public router: Router ) {
      this.buttons = this.buttonService.getCurrentFolder();
      this.config = this.configService.getConfig();
   }

   ngOnInit() {
      if ( this.config.channelName == "" ) {
         this.router.navigate( [ './config' ] );
      }
   }

   startDeck() {

   }

   doAction( button: Button ) {
      let that = this;

      button.actions.forEach( function ( elem, index ) {
         let fn = that[ elem.func ];
         if ( typeof fn === "function" && that.delayed == false ) {
            fn( that, elem );
         } else if ( typeof fn === "function" && that.delayed == true ) {
            that.queuedActions.push( elem );
         }
      } );
   }

   continueAction( that ) {
      let delayed = false;
      let myActions = JSON.parse( JSON.stringify( this.queuedActions ) );
      this.queuedActions = [];

      myActions.forEach( function ( elem, index ) {
         let fn = that[ elem.func ];
         if ( typeof fn === "function" && that.delayed == false ) {
            fn( that, elem );
         } else if ( typeof fn === "function" && that.delayed == true ) {
            that.queuedAction.push( elem );
         }
      } );
   }

   deck_delay( that, action ) {
      that.delayed = true;
      setTimeout( function () {
         that.delayed = false;
         that.continueAction( that );
      }, +action.timeout );
   }

   deck_folder( that, action ) {
      that.buttons = that.buttonService.openFolder( action.folder );
   }

   twitch_subs( that, action ) {
      //that.twitchService.sendMessage( '/subscribers' );
      that.twitchService.toggleSubMode( action.minutes );
   }

   twitch_emote( that, action ) {
      //that.twitchService.sendMessage( '/emoteonly' );
      that.twitchService.toggleEmoteMode( action.minutes );
   }

   twitch_followers( that, action ) {
      // that.twitchService.sendMessage( '/followers' );
      that.twitchService.toggleFollowerMode( action.minutes );
   }

   twitch_slow( that, action ) {
      // that.twitchService.sendMessage( '/slow ' + action.seconds );
      that.twitchService.toggleSlowMode( action.seconds );
   }

   twitch_commercial( that, action ) {
      that.twitchService.sendMessage( '/commercial ' + action.duration );
   }

   twitch_custom_message( that, action ) {
      that.twitchService.sendMessage( action.message );
   }

   obs_toggle_streaming( that, action ) {

   }

   obs_toggle_recording( that, action ) {

   }

   obs_toggle_mic( that, action ) {

   }

   obs_change_scene( that, action ) {

   }

   obs_toggle_source( that, action ) {

   }

   media_play_pause( that, action ) {

   }

   media_prev_track( that, action ) {

   }

   media_next_track( that, action ) {

   }

   media_mute( that, action ) {

   }

   media_stop( that, action ) {

   }

   media_vol_up( that, action ) {

   }

   media_vol_down( that, action ) {

   }

   sys_hotkey( that, action ) {
      that.ks.ks.sendCombination(['meta', 'shift', '4']);
   }
}
