import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxElectronModule} from 'ngx-electron';
import {DragDropDirectiveModule} from 'angular4-drag-drop';

import {AppComponent} from './app.component';
import {ButtonComponent} from './button-pane/button.component';
import {ActionPaneComponent} from './action-pane/action-pane.component';
import {DetailsPaneComponent} from './details-pane/details-pane.component';

import {ButtonService} from './button.service';
import {ConfigurationService} from './configuration.service';
import {RouterModule, Routes} from '@angular/router';
import {ConfigComponent} from './config-window/config.component';
import {LayoutComponent} from './layout-window/layout.component';
import {RunComponent} from './run-window/run.component';
import {PageNotFoundComponent} from './page-not-found-window/page-not-found.component';
import {ActionDetailsPaneComponent} from './action-details-pane/action-details-pane.component';
import {ObsWebsocketService} from './obs-websocket.service';
import {FilesysService} from './filesys.service';
import {TwitchService} from './twitch.service';
import {KeysenderService} from './keysender.service';

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
    ActionDetailsPaneComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxElectronModule,
    DragDropDirectiveModule,
    BrowserAnimationsModule
  ],
  providers: [
    ButtonService,
    ConfigurationService,
    ObsWebsocketService,
    FilesysService,
    TwitchService,
    KeysenderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
