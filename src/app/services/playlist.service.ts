import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

import { PlayListItem } from '../models/PlayListItem';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3000/playlist';
    this.init();
   }

   playItemDefault: PlayListItem = {
    title: '',
    url: '',
    status : 'added',
    approved : 1,
    likes : 0,
    unlikes : 0,
    currentStatus : 'paused',
    exitplayprogress : 0
  };

  private playListItems: PlayListItem[];
  private url: string;

  private sourcePlayListItems = new BehaviorSubject<PlayListItem[]>(this.playListItems);
  recieverPlayListItems = this.sourcePlayListItems.asObservable();

  private sourcePlayListItem = new BehaviorSubject<PlayListItem>(this.playItemDefault);
  recieverPlayListItem = this.sourcePlayListItem.asObservable();

  init() {
    this.getPlayList().subscribe(playList => {
      this.sourcePlayListItems.next(playList);
    });
  }

  deletePlayListItem(id: string): Observable<PlayListItem> {
    return this.httpClient.delete<PlayListItem>(this.url + `/${id}`);
  }

  updatePlayListItem(item: any): Observable<PlayListItem> {
    const httpHeaders = {
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.httpClient.put<PlayListItem>(this.url + `/${item.id}`, item, httpHeaders);
  }

  getPlayList(): Observable<PlayListItem[]> {
    return this.httpClient.get<PlayListItem[]>(this.url);
  }

  getApprovedPlayList(): Observable<PlayListItem[]> {
    return this.httpClient.get<PlayListItem[]>(this.url + `?approved=0`);
  }

  savePlayListItem(item: PlayListItem) {
    const httpHeaders = {
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.httpClient.post<PlayListItem>(this.url, item, httpHeaders);
  }

  updatePlayListItems() {
    this.getPlayList().subscribe(playList => {
      this.sourcePlayListItems.next(playList);
    });
  }

  updatePlayListItm(item) {
    this.sourcePlayListItem.next(item);
  }
}
