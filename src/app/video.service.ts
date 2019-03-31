import { Injectable } from '@angular/core';
import {Http,Response, RequestOptions, RequestOptionsArgs} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {Video} from '../../server/models/video'

export interface VideoTokenPayload {
  userId:string
  }
@Injectable({
  providedIn: 'root'
})
export class VideoService {

private _getUrl="/api/videos";
private _postUrl="/api/video";
private _putUrl="/api/video/";
private _deleteUrl="/api/video/";

  constructor(private _http: HttpClient) { }

  getVideos(userId:VideoTokenPayload ){
    return this._http.post(this._getUrl, userId);
//    return this._http.get(this._getUrl);
  }

  addVideo(video: Video){

    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
       
      })
    };

    return this._http.post(this._postUrl,JSON.stringify(video),options);
}

updateVideo(video:Video){
  const options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
     
    })
  };
    return this._http.put(this._putUrl+video._id,JSON.stringify(video),options);
  
}

deleteVideo(video:Video){
    return this._http.delete(this._deleteUrl+video._id);
}

}
