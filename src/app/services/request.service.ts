import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private firestore: AngularFirestore) { }

  getRequestData(addedAt, uid) {
    return this.firestore.collection('requests', (ref) => ref.where('date', '==', addedAt).where('uid', '==', uid)).snapshotChanges();
  }

  sendRequest(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('requests')
        .add(data)
        .then(res => { resolve(res); }, err => reject(err));
    });
  }


}
