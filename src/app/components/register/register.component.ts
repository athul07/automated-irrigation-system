import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  error: { name: string, message: string } = { name: '', message: '' };

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  register(){
    this.clearErrorMessage();
    if(this.validateForm(this.email, this.password) ){
      this.authService.registerWithEmail(this.email, this.password).then(()=>{
        console.log('registerrr')
        this.router.navigate[('/home')]
      }).catch(_error => {
        this.error = _error;
        console.log(this.error)
        this.router.navigate[('/register')]
      })
    }
  }

  clearErrorMessage(){
    this.errorMessage = '';
    this.error = { name: '', message: '' }
  }

  validateForm(email, password){
    if (email.length === 0){
      this.errorMessage = "Email is required";
      return false;
    } 
    if (password.length === 0){
      this.errorMessage = "Password is required";
      return false;
    } else if (password.length < 6){
      this.errorMessage = "Password should be at least 6 char";
      return false;
    }
    return true;
  }

}
