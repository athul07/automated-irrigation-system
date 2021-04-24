import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { UserService } from '../../../services/user.service';
import { DeleteComponent } from '../../../messages/delete/delete.component';
import { Router } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList: any[] = [];

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  addNewUser() {
    window.scrollTo(0, 0);
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        
      } else {
      }
    });
  }

  getUserList(){
    this.userService.getUserList().subscribe(res => {
      this.userList = res;
      this.userList = this.userList.filter(x =>
        (x.payload.doc.data().user_type === 'user')
      );
    });
  }

  deleteUser(data){
    const dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.userService.deleteUser(data);
        
      }
    });
  }

  getUserConsumption(id){
    this.router.navigateByUrl(`consumption?user_id=${id}`);
  }

}
