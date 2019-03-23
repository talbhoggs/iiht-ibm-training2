import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { PlayerComponent } from './components/player/player.component';
import { ControlsComponent } from './components/controls/controls.component';
import { PlaylistComponent } from './components/playlist/playlist.component';

import { PlaylistService } from './services/playlist.service';
import { CreatePlayItemComponent } from './components/createplayitem/createplayitem.component';

import { appRoutes } from './routes';
import { CreatevideoComponent } from './components/createvideo/createvideo.component';
import { VideolistComponent } from './components/videolist/videolist.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AboutpageComponent } from './components/aboutpage/aboutpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    PlayerComponent,
    ControlsComponent,
    PlaylistComponent,
    CreatePlayItemComponent,
    CreatevideoComponent,
    VideolistComponent,
    AboutpageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})
  ],
  providers: [PlaylistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
