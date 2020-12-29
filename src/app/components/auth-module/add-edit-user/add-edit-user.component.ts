import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  email: string = '';
  password: string = '';
  address: string = '';
  meterId: string = '';
  phone: number;
  name: string = '';
  data: any;

  errorMessage: string = '';
  error: { name: string, message: string } = { name: '', message: '' };

  constructor(
    public dialogRef: MatDialogRef<AddEditUserComponent>,
    private authService: UserService,
  ) { }

  ngOnInit(): void {
  }

  register(){
    this.data = {
      name: this.name,
      phone: this.phone,
      address: this.address,
      email: this.email,
      meter_id: this.meterId,
      user_type: 'user',
      password: this.password,
      added_at: new Date()
    }
    this.clearErrorMessage();
    if(this.validateForm(this.email, this.password) ){
      this.authService.registerWithEmail(this.email, this.password, this.data).then(()=>{
        console.log('registerrr')
        // this.router.navigate[('/home')]
      }).catch(_error => {
        this.error = _error;
        console.log(this.error)
        // this.router.navigate[('/register')]
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
