import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GateService {

  constructor(private firestore: AngularFirestore,) { }

  createGate(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('gates')
        .add(data)
        .then(res => { resolve(res); }, err => reject(err));
    });
  }

  editGate(data, id) {
    return this.firestore
      .collection('gates')
      .doc(id)
      .update(data);
  }

  getGetList() {
    return this.firestore.collection('gates', (ref) => ref.orderBy('added_at', 'asc')).snapshotChanges();
  }
}
