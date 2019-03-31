import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails,RegisterTokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  details: RegisterTokenPayload;

  constructor(private auth: AuthenticationService ,private router: Router) {}
  
  ngOnInit() { 
    if(sessionStorage.getItem("User")!=null)   {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
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
}
