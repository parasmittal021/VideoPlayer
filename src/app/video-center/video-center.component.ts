import { Component, OnInit } from '@angular/core';
import{ Video} from './../video';
import {VideoService,VideoTokenPayload} from './../video.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css']
})
export class VideoCenterComponent implements OnInit {

selectedVideo:any;

credentials:VideoTokenPayload = {
userId:''
};

hiddenNewVideo=true;
showDivError:Boolean=false;
showDivSuccess:Boolean=false;
errorMessage:string='';
videos:any;
  constructor(private _videoService:VideoService,private auth: AuthenticationService,private router: Router) { }

  ngOnInit() {  
    if(sessionStorage.getItem("User")!=null && sessionStorage.getItem("userId")!=null )   {
      this.credentials.userId=sessionStorage.getItem("userId");
    this._videoService.getVideos(this.credentials).subscribe(
      (resVideoData)=>{this.videos=resVideoData},
    (err)=>{
      this.showDivError=true;
      this.showDivSuccess=false;
      this.errorMessage="Some error occured.Try again later";
    });
  }
  else{
    this.router.navigateByUrl('/login');
  } 
  }

  logout(){
    sessionStorage.removeItem("User");
    this.auth.logout();
    }

  onSubmitAddVideo(video:Video){
    if(sessionStorage.getItem("userId")!=null)   {
      video.userId=sessionStorage.getItem("userId");
  }
 
    this._videoService.addVideo(video)
    .subscribe((resNewVideo)=>{
        this.videos.push(resNewVideo);
        this.selectedVideo=resNewVideo;
        this.hiddenNewVideo=true;
    },
    (err)=>{
      this.showDivError=true;
      this.showDivSuccess=false;
      this.errorMessage="Some error occured.Try again later";
    });
}
newVideo(){
    this.hiddenNewVideo=false;
}

onSelectVideo(video:any){
this.selectedVideo=video;
this.hiddenNewVideo=true;
    
}

onUpdateVideoEvent(video:any){
  if(sessionStorage.getItem("userId")!=null)   {
    video.userId=sessionStorage.getItem("userId");
}

    this._videoService.updateVideo(video)
    .subscribe((resUpdateVideo)=>{video=resUpdateVideo;
      this.selectedVideo=null;},
    (err)=>{
      this.showDivError=true;
      this.showDivSuccess=false;
      this.errorMessage="Some error occured.Try again later";
    });
  
}

onDeleteVideoEvent(video:any){
    let videoArray=this.videos;
    if(sessionStorage.getItem("userId")!=null)   {
      video.userId=sessionStorage.getItem("userId");
  }
    this._videoService.deleteVideo(video)
    .subscribe((resDeleteVideo)=>{
        for(let i=0;i<videoArray.length;i++){
        if(videoArray[i]._id==video._id){
            videoArray.splice(i,1);
        }
            
        }
        this.selectedVideo=null;
    },
    (err)=>{
      this.showDivError=true;
      this.showDivSuccess=false;
      this.errorMessage="Some error occured.Try again later";
    }
    );
  
    
}

}
