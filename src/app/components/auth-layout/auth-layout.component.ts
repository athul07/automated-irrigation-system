import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  userDetails;

  constructor(
    private authService: AuthService,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
    this.userDetails = this.dataService.getUserDetails();
  }

  logout(){
    this.authService.signOut();
  }

}
