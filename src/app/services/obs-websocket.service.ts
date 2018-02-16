import {Injectable} from '@angular/core';
import * as shajs from 'sha.js/sha256';
import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';

@Injectable()
export class ObsWebsocketService {
  DEBUG = true;

  connected = false;

  ws;
  _sceneList = null;
  _sourcesList = null;
  _transitionList = null;
  _nextId = 1;
  _messageIdList = [];
  _authorized = false;
  _authRequired = false;

  private _password = '';

  constructor() {
  }


  /*
   * Connects, Authenticates, and loads our default list values, Scenes and Sources.
   */
  connect(url, password) {
    this.ws = null;
    this.ws = new $WebSocket('ws://' + url + ':4444');
    this.ws.mode = WebSocketSendMode.Observable;
    this.ws.setSend4Mode(WebSocketSendMode.Observable);
    this._password = password;
    this.ws.getDataStream().subscribe(
      (msg) => {
        const data = JSON.parse(msg.data);
        this.debug('Got response: ', msg.data);
        if (data['update-type'] != null) {
          this.handleResponse(data, data['update-type']);
        } else {
          const messageId = JSON.parse(msg.data)['message-id'];
          this.handleResponse(data, this._messageIdList[messageId]);
        }
      },
      (msg) => {
        this.debug('Observer error', msg);
      },
      () => {
        this.debug('Connected');
      }
    );

    const auth = {authRequired: false, salt: '', challenge: ''};

    this.send('GetAuthRequired');
  }

  handleResponse(data, requestType) {
    switch (requestType) {
      case 'GetAuthRequired':
        this._authRequired = data.authRequired;

        // If we need to authenticate, might as well go and do that now.
        if (this._authRequired) {
          this._authorized = false;
          const hash = this.makeHash(data.salt, data.challenge, this._password);
          this.send('Authenticate', {
            auth: hash
          });
        } else {
          this.loadLists();
          this.debug('Connected to OBS! (No auth)');
        }
        break;
      case 'Authenticate':
        if (data.status !== 'error') {
          this.connected = true;
          this._authorized = true;
          this.loadLists();
          this.debug('Connected to OBS! (Auth)');
        } else {
          this.debug('Connection to OBS failed. Wrong password');
        }
        break;
      case 'ScenesChanged':
        this.send('GetSceneList');
        break;
      case 'GetSceneList':
        this._sceneList = data.scenes;
        break;
      case 'GetTranstionList':
        this._transitionList = data.transitions;
        break;
      case 'GetSourcesList':
        this._sourcesList = data.sources;
        break;
    }
  }

  loadLists() {
    this.send('GetSceneList');
    this.send('GetTransitionList');
    this.send('GetSourcesList');
  }

  makeHash(salt = '', challenge = '', msg) {
    const hash = new shajs()
      .update(msg)
      .update(salt)
      .digest('base64');

    const resp = new shajs()
      .update(hash)
      .update(challenge)
      .digest('base64');

    return resp;
  }

  generateMessageId() {
    return String(this._nextId++);
  }

  send(command, data = null) {
    const messageId = this.generateMessageId();
    const payload = {'message-id': messageId, 'request-type': command};
    if (data != null) {
      Object.assign(payload, data);
    }
    this.ws.send4Direct(payload);
    console.log('Payload: ', payload);
    this._messageIdList[parseInt(messageId.toString(), 10)] = command;
  }

  debug(...msg) {
    let str = '';
    if (this.DEBUG === true) {
      for (let i = 0; i < msg.length; i++) {
        str += (msg[i]);
      }
    }
    if (str !== '') {
      console.log(str);
    }
  }
}
