import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { DataService } from '../../shared/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private dataService: DataService
    ) {
      this.afAuth.authState.subscribe((auth => {
        this.authState = auth;
      }))
    }

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false;
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : '';
  }

  get currentUserName(): string {
    return this.authState['email'];
  }

  get currentUser():any {
    return (this.authState !== null) ? this.authState : null;
  }

  registerWithEmail(email: string, password: string){
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((user)=>{
      this.authState = user;
    }).catch(error=>{
      console.log(error);
      throw error;
    })
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((user)=>{
      this.authState = user;
      this.dataService.setUser(this.authState.user);
      this.dataService.setStorage('isLoggedIn', { isLoggedIn: true});
      console.log(this.authState)
    }).catch(error=>{
      console.log(error);
      throw error;
    })
  }

  signOut():void {
    this.afAuth.signOut();
    this.dataService.removeStorage('user');
    this.dataService.removeStorage('isLoggedIn');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
