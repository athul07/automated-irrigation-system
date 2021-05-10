import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from "../services/data.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public router: Router, public sharedData: DataService) {}

  canActivate(): boolean {
    if (this.sharedData.getUserDetails().user_type === 'admin') {
      // this.router.navigate(["/"]);
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}
