import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authState: any = null;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
    ) {
      this.afAuth.authState.subscribe((auth => {
        this.authState = auth;
      }))
    }

  registerWithEmail(email: string, password: string, data: any){
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((user)=>{
      this.authState = user;
      data['userid'] = this.authState.user.uid;
      this.createUser(data);
    }).catch(error=>{
      console.log(error);
      throw error;
    })
  }

  deleteAuthUser(){
    
  }

  createUser(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('users')
        .add(data)
        .then(res => { resolve(res); }, err => reject(err));
    });
  }

  getUserList() {
    return this.firestore.collection('users').snapshotChanges();
  }

  deleteUser(data) {
    return this.firestore
      .collection('users')
      .doc(data.payload.doc.id)
      .delete();
  }
}
