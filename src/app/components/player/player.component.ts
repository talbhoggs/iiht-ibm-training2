import { Component, OnInit, OnDestroy} from '@angular/core';
import { PlayListItem } from 'src/app/models/PlayListItem';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  private player: any;
  private volume = 20;
  public progressbar = 0;
  private selectedVideo: PlayListItem;

  constructor() {}

  init() {
    setInterval(() => { this.updateProgressBar(); } , 1000);
  }

  ngOnInit() {

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    (window as any).onYouTubeIframeAPIReady = (e) => {
        this.player = new window['YT'].Player('player', {
          //videoId : 'rcFKFv9wbS0',
          height: '315',
          width: '560',
          playerVars : {
            controls: 0,
            rel: 0,
            showInfo: 0,
            color : 'white',
            fs : 0,
            modestbranding : 1,
            origin: 'http://localhost:4200',
            autohide: 1
          }
        });
      };
    // work around!
    // I have issue running this using routerlink. It seems it is not calling ngOnInit

    // workaround is load the entire page when calling
    // /main page
    this.init();
  }

  onPlay() {
    this.player.playVideo();
  }

  onPause() {
    this.player.pauseVideo();
  }

  onVolumePlus() {
    this.volume  += 10;
    this.player.setVolume(this.volume);
  }

  onVolumeMinus() {
    this.volume  -= 10;
    this.player.setVolume(this.volume);
  }

  onMuteUnMute() {
    if (this.player.isMuted()) {
      this.player.unMute();
    } else {
        this.player.mute();
    }
  }

  onReload() {
    this.player.seekTo(0);
    this.onPlay();
  }

  selVideo(item: PlayListItem) {
    this.selectedVideo = item;
    this.player.loadVideoById({'videoId' : this.getVideoHash()});
  }

  updateProgressBar() {
      const percentage = Math.floor((100 / this.player.getDuration()) * this.player.getCurrentTime());
      this.progressbar = !isNaN(percentage) ? percentage : 0;
  }

  getVideoHash() {
    return this.selectedVideo.url.split('v=')[1];
  }
}
