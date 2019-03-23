import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlaylistService } from 'src/app/services/playlist.service';

import { PlayListItem } from 'src/app/models/PlayListItem';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @Output() slctVideo = new EventEmitter<PlayListItem>();

  playList: PlayListItem[];

  constructor(private playListService: PlaylistService) { }

  ngOnInit() {
    this.playListService.getApprovedPlayList().subscribe(playlist => {
      this.playList = playlist;
    });
  }

  selectedVideo(item: PlayListItem) {
    this.playListService.updatePlayListItm(item);
    this.slctVideo.emit(item);
  }

  setActive(e) {
    console.log(e);
  }
}
