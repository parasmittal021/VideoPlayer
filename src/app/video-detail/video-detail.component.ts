import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  inputs:['video'],
  outputs: ['updateVideoEvent','deleteVideoEvent']
})
export class VideoDetailComponent implements OnInit {
  
 editTitle:boolean=false;
 updateVideoEvent=new EventEmitter();
 deleteVideoEvent=new EventEmitter();
  video: any;

  constructor() { }
videoUrl:string='';
  ngOnInit() {

this.videoUrl="https://youtube.com/embed/"+this.extractVideoID(this.video.url);
  }
ngOnChanges(){
this.editTitle=false;
}
onTitleClick(){
  this.editTitle=true;
}
updateVideo(){
  this.updateVideoEvent.emit(this.video);
}
deleteVideo(){
  this.deleteVideoEvent.emit(this.video);
}
 extractVideoID(url:string){
   var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  if ( match && match[7].length == 11 ){
      return match[7];
  }else{
      alert("Could not extract video ID.");
  }
}
}
