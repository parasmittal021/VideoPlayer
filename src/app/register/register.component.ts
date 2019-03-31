import { Component, OnInit } from '@angular/core';
import { AuthenticationService, RegisterTokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import {PasswordValidation } from '../password-validation'
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
alreadyExist:Boolean=false;
error:Boolean=false;
  credentials: RegisterTokenPayload  = {
    email: '',
    firstName: '',
    lastName:'',
    phone:'',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router)
  {
  }
  

  register(userForm: NgForm) {
    this.credentials.email=userForm.controls['email'].value;
    this.credentials.firstName=userForm.controls['First Name'].value;
    this.credentials.lastName=userForm.controls['Last Name'].value;
    this.credentials.phone=userForm.controls['phone'].value;
    this.credentials.password=userForm.controls['password'].value;
    this.auth.register(this.credentials).subscribe((output) => {
      console.log(output.userId);
      sessionStorage.setItem("userId", output.userId);
      this.alreadyExist=false;
      this.error=false;
      sessionStorage.setItem("User", this.credentials.email);
      this.router.navigateByUrl('/home');
    }, (err) => {
      if(err.status==409){
        this.alreadyExist=true;
      }
      else if(err.status==500){
        this.error=true;
      }
      console.error(err);
    });
  }
  ngOnInit() {
    
  }

}
