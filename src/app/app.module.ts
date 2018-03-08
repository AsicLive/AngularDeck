import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {NgxElectronModule} from 'ngx-electron';
import {DragDropDirectiveModule} from 'angular4-drag-drop';

import {AppComponent} from './app.component';
import {ButtonComponent} from './components/panes/button-pane/button.component';
import {ActionPaneComponent} from './components/panes/action-pane/action-pane.component';
import {DetailsPaneComponent} from './components/panes/details-pane/details-pane.component';
import {ActionDetailsPaneComponent} from './components/panes/action-details-pane/action-details-pane.component';
import {ConfigComponent} from './components/windows/config-window/config.component';
import {LayoutComponent} from './components/windows/layout-window/layout.component';
import {RunComponent} from './components/windows/run-window/run.component';
import {PageNotFoundComponent} from './components/windows/page-not-found-window/page-not-found.component';

import {ButtonService} from './services/button.service';
import {ConfigurationService} from './services/configuration.service';
import {ObsWebsocketService} from './services/obs-websocket.service';
import {FilesysService} from './services/filesys.service';
import {TwitchService} from './services/twitch.service';
import {KeysenderService} from './services/keysender.service';
import {ArduinoService} from './device_services/arduino.service';
import { ImagePaneComponent } from './image-pane/image-pane.component';

const appRoutes: Routes = [
  {path: 'config', component: ConfigComponent},
  {path: 'run', component: RunComponent},
  {path: 'layout', component: LayoutComponent},
  {path: '', redirectTo: '/layout', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

// enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ActionPaneComponent,
    DetailsPaneComponent,
    ConfigComponent,
    LayoutComponent,
    RunComponent,
    PageNotFoundComponent,
    ActionDetailsPaneComponent,
    ImagePaneComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxElectronModule,
    DragDropDirectiveModule
  ],
  providers: [
    ButtonService,
    ConfigurationService,
    ObsWebsocketService,
    FilesysService,
    TwitchService,
    KeysenderService,
    ArduinoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
