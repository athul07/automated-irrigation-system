import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { DataService } from '../../shared/services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
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

      this.dataService.setStorage('loginData' ,this.authState.user);
      this.dataService.setStorage('isLoggedIn', { isLoggedIn: true});

      this.getActiveUser(this.authState.user.uid).subscribe((res: any)=>{
        this.dataService.setUser(res[0].payload.doc.data());
        if (res[0].payload.doc.data().user_type === 'admin') {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.router.navigateByUrl('/request');
        }
        
      })
    }).catch(error=>{
      console.log(error);
      throw error;
    })
  }

  getActiveUser(uid){
    return this.firestore.collection('users', ref => ref.where('userid', '==', uid)).snapshotChanges();
  }

  signOut():void {
    this.afAuth.signOut();
    this.dataService.removeStorage('loginData');
    this.dataService.removeStorage('user');
    this.dataService.removeStorage('isLoggedIn');
    localStorage.clear();
    this.router.navigate(['/home']);
    window.location.reload();
  }

}
