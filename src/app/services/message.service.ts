import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private firestore: AngularFirestore) { }

  sendMessage(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('messages')
        .add(data)
        .then(res => { resolve(res); }, err => reject(err));
    });
  }

  getMessages(addedAt, userType) {
    const type = (userType === 'admin') ? 'user' : 'admin' ;
    return this.firestore.collection('messages', (ref) => ref.where('date', '==', addedAt).where('user_type', '==', type)).snapshotChanges();
  }
}
