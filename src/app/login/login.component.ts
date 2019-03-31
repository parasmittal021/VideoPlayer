import { Component, OnInit } from '@angular/core';
import { AuthenticationService, LoginTokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
notFound:Boolean=false;
 

  ngOnInit() {
  }
  credentials: LoginTokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  login(userForm: NgForm) {
    this.credentials.email=userForm.controls['email'].value;
    this.credentials.password=userForm.controls['password'].value;
    this.auth.login(this.credentials).subscribe((output) => {
      this.notFound=false;
      sessionStorage.setItem("User", this.credentials.email);
    
      sessionStorage.setItem("userId",output.userId);
      this.router.navigateByUrl('/home');
    }, (err) => {
      if(err.status==401){
        this.notFound=true;
      }
   
    }); 
  }
}