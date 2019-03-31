import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService,ForgotTokenPayload} from '../authentication.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  credentials: ForgotTokenPayload = {
    email: '',
  
  };
  
showDivError:Boolean=false;
showDivSuccess:Boolean=false;
errorMessage:string='';
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }
  forgot_password(userForm: NgForm) {
    this.credentials.email=userForm.controls['email'].value;
 
    this.auth.forgotPassword(this.credentials).subscribe(() => {
      this.showDivError=false;
      this.showDivSuccess=true;
    }, (err) => {
      this.showDivError=true;
      this.showDivSuccess=false;
      if(err.status==401){
        this.errorMessage="User not found.Try with valid credentials.";
      }
      else if(err.status==422){
        this.errorMessage="Mail cannot be sent.Try again later.";
      }
      else{
        this.errorMessage="Some error occured.Try again later";
      }
      console.error(err);
    }); 
  }
}