import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PlayListItem } from 'src/app/models/PlayListItem';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  @Output() cntPlay = new EventEmitter();
  @Output() cntPause = new EventEmitter();
  @Output() cntVolumePlus = new EventEmitter();
  @Output() cntVolumeMinus = new EventEmitter();
  @Output() cntOnMute = new EventEmitter();
  @Output() cntReload = new EventEmitter();
  @Input() selectedItem;
  selItem: any;
  likes: any = 0;
  unlikes: any = 0;

  isPlaying = true;


  constructor(private playListService: PlaylistService) {
    this.playListService.recieverPlayListItem.subscribe(playItem => {
      this.likes = playItem.likes;
      this.unlikes = playItem.unlikes;
      this.selItem = playItem;
    });
  }

  ngOnInit() {
  }

  controlPlay() {
    this.isPlaying = true;
    this.playListService.updatePlayListItm(this.selItem);
    this.cntPlay.emit();
  }

  controlPause() {
    this.isPlaying = false;
    this.cntPause.emit();
  }

  controlVolumePlus() {
    this.cntVolumePlus.emit();
  }

  controlVolumeMinus() {
    this.cntVolumeMinus.emit();
  }

  controlMute() {
    this.cntOnMute.emit();
  }

  controlReload() {
    this.isPlaying = true;
    this.cntReload.emit();
  }

  unLikeFunction() {
    this.selectedItem.unlikes += 1;
    this.playListService.updatePlayListItm(this.selItem);
  }

  likeFunction() {
    this.selectedItem.likes += 1;
    this.playListService.updatePlayListItm(this.selItem);
  }
}
