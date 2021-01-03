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

  getMessages(addedAt) {
    return this.firestore.collection('messages', (ref) => ref.where('date', '==', addedAt)).snapshotChanges();
  }
}
