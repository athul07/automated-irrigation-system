import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { UserService } from '../../../services/user.service';
import { GateService } from '../../../services/gate.service';

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
  subGate: any;
  subGateList = [];

  errorMessage: string = '';
  error: { name: string, message: string } = { name: '', message: '' };

  constructor(
    public dialogRef: MatDialogRef<AddEditUserComponent>,
    private authService: UserService,
    private gateService: GateService,
  ) { }

  ngOnInit(): void {
    this.getGateList();
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
      added_at: new Date(),
      sub_gate_name: this.subGateList[+this.subGate].payload.doc.data().gate_name,
      sub_gate_id: this.subGateList[+this.subGate].payload.doc.id
    }
    this.clearErrorMessage();
    if(this.validateForm(this.email, this.password) ){
      this.authService.registerWithEmail(this.email, this.password, this.data).then(()=>{
        this.dialogRef.close();
        // this.router.navigate[('/home')]
      }).catch(_error => {
        this.error = _error;
        alert(this.error)
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

  getGateList() {
    this.gateService.getGetList().subscribe(res => {
      this.subGateList = res;
      this.subGate = 0;
    });
  }
}
