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

  getRequestList(addedAt) {
    return this.firestore.collection('requests', (ref) => ref.where('date', '==', addedAt)).snapshotChanges();
  }

  getUserRequestList(uid) {
    return this.firestore.collection('requests', (ref) => ref.where('uid', '==', uid)).snapshotChanges();
  }

  getWaterInDam(addedAt) {
    return this.firestore.collection('water_in_dam', (ref) => ref.where('date', '==', addedAt)).snapshotChanges();
  }

  setWaterInDam(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('water_in_dam')
        .add(data)
        .then(res => { resolve(res); }, err => reject(err));
    });
  }

  generateAction(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('generate')
        .add(data)
        .then(res => { resolve(res); }, err => reject(err));
    });
  }

  getGeneratedData(addedAt) {
    return this.firestore.collection('generate', (ref) => ref.where('date', '==', addedAt)).snapshotChanges();
  }

}
