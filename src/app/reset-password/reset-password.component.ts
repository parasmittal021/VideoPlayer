import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService,ResetTokenPayload, ForgotTokenPayload} from '../authentication.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token:string;
  email:string;
  render:boolean=true;
  credentials: ResetTokenPayload = {
    newPassword:'',
    confirmPassword:'',
    email:''
  
  };
  cred:ForgotTokenPayload={
    email:''
  };
  showDivError:Boolean=false;
showDivSuccess:Boolean=false;
errorMessage:string='';
  constructor(private auth: AuthenticationService, private router: Router,private route:ActivatedRoute) { 
    this.route.queryParams.subscribe(params=>{
  this.email=params['email'];
  this.token=params['token'];
 
    });
  }

  ngOnInit() {
    if(!this.auth.getToken && !this.token){
if(   this.token!=this.auth.getToken()){
this.render=false;
}
    }
    else if(this.email!=null && this.token!=null){
      this.cred.email=this.email;
      this.auth.getTokenData(this.cred).subscribe((output) => {
        if(   this.token!=output.token){
          this.render=false;
          }
          
      }, (err) => {
        console.error(err);
      }); 
    }
    else{
      this.router.navigateByUrl('/login'); 
    }
  }
  reset_password(userForm: NgForm) {
    this.credentials.newPassword=userForm.controls['password'].value;
    this.credentials.confirmPassword=userForm.controls['confirmpassword'].value;
 this.credentials.email=this.email;
    this.auth.resetPassword(this.credentials).subscribe(() => {
      this.showDivError=false;
      this.showDivSuccess=true;
    }, (err) => {
      this.showDivError=true;
      this.showDivSuccess=false;
     
 
        this.errorMessage="Some error occured.Try again later";
   
     
    }); 
  }
}
