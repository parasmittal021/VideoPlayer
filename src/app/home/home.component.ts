import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthenticationService,private router: Router) {
    }

  
  ngOnInit() {
    if(sessionStorage.getItem("User")==null)   {
      this.router.navigateByUrl('/login');
  }
}
logout(){
  sessionStorage.removeItem("User");
this.auth.logout();
}
}
