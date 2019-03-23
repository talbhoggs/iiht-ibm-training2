import { Component, OnInit } from '@angular/core';
import { PlaylistService } from 'src/app/services/playlist.service';
import { PlayListItem } from 'src/app/models/PlayListItem';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css']
})
export class VideolistComponent implements OnInit {

  constructor(private playListService: PlaylistService, private modalService: NgbModal) { }

  playList: PlayListItem[];

  selectedItemDelete: any;

  isValid = false;

  playItemEdit: PlayListItem;

  playItemReset: PlayListItem = {
    title: '',
    url: '',
    status : 'added',
    approved : 1,
    likes : 0,
    unlikes : 0,
    currentStatus : 'paused',
    exitplayprogress : 0
  };

  ngOnInit() {
    this.playListService.recieverPlayListItems.subscribe(playlist => {
      this.playList = playlist;
    });
    this.playItemEdit = this.playItemReset;
  }

  edit(item, content) {
    this.playItemEdit = item;
    this.open(content);
  }

  delete(item, content) {
    this.selectedItemDelete = item;
    this.open(content);
  }

  approve(item) {

    const isApprove = parseInt(item.approved, 10); // radix 10 for decimal

    if ( isApprove === 0) {
      return;
    }

    Object.assign(item, {approved : 0}); // reset approved params.

    this.playListService.updatePlayListItem(item).subscribe(playItem => {
      this.playListService.updatePlayListItems();
    });
  }

  deletePlayListItem(item) {
    this.playListService.deletePlayListItem(item.id).subscribe(playListItem => {
      this.playListService.updatePlayListItems();
    });
  }

  open(name: string) {
    this.modalService.open(name);
  }

  onSubmit(playItemForm, modal) {
    this.isValid = true;
    Object.assign(this.playItemEdit, {approved : 1}); // reset approved params
    this.playListService.updatePlayListItem(this.playItemEdit).subscribe(playItem => {
      window.setTimeout(() => {
        this.isValid = false;
        this.playListService.updatePlayListItems();
        modal.close();
        this.playItemEdit = this.playItemReset;
        playItemForm.reset();
      }, 1000);
    });
  }
}
