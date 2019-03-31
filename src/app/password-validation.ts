import {AbstractControl,  NG_VALIDATORS, Validator} from '@angular/forms';
import { Directive, Input, Attribute, OnInit } from '@angular/core';


@Directive({
    selector: '[confirmPassword][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting:  PasswordValidation , multi: true }
      ]
  })
export class PasswordValidation implements Validator {


 
    @Input('confirmPassword') public confirmPassword: string;

 

      validate(c:AbstractControl): {[key: string]: any} | null{
        let password=c.root.get(this.confirmPassword);
     
   
    let cpassword= c.value;
    
          
          if(password.value===cpassword) {
              return null;
          } else {
              return {
                confirmPassword : {
                      valid: false
                  }
              
        }
      }
 
  

      }
}


