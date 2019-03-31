import{Video} from './../video';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  inputs: ['videos'],
  outputs:['SelectedVideo']
})
export class VideoListComponent implements OnInit {
public SelectedVideo=new EventEmitter();
videos:any;
  constructor() { }

  ngOnInit() {
  }

  onSelect(vid:Video){
    this.SelectedVideo.emit(vid);
  }

}
