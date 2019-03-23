import { Component, OnInit } from '@angular/core';
import { PlayListItem } from 'src/app/models/PlayListItem';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-createvideo',
  templateUrl: './createvideo.component.html',
  styleUrls: ['./createvideo.component.css']
})
export class CreatevideoComponent implements OnInit {

  playItem: PlayListItem = {
    title: '',
    url: '',
    status : 'added',
    approved : 1,
    likes : 0,
    unlikes : 0,
    currentStatus : 'paused',
    exitplayprogress : 0
  };

  isValid = false;

  constructor(private playListService: PlaylistService) { }

  ngOnInit() { }

  onSubmit(playItemForm) {
    this.isValid = true;

    this.playListService.savePlayListItem(this.playItem).subscribe(playItem => {
      window.setTimeout(() => {
        this.isValid = false;
        this.playListService.updatePlayListItems();
      }, 1000);
    });

    // reset
    this.playItem = {
      title: '',
      url: '',
      status : 'added',
      approved : 1,
      likes : 0,
      unlikes : 0,
      currentStatus : 'paused',
      exitplayprogress : 0
    };

    playItemForm.reset();
  }
}

