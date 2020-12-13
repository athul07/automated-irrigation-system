import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from "../services/data.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router, public sharedData: DataService) {}

  canActivate(): boolean {
    if (this.sharedData.getStorage('isLoggedIn') && this.sharedData.getUserDetails()) {
      // this.router.navigate(["/"]);
      console.log("aaaaa")
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
  
}
