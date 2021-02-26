import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firestore: AngularFirestore) { }

  async getTrova() {
    return await firebase.firestore()
      .collection('trova')
      .get()
      .then((res) => res.docs.map(doc => ({
        ...doc.data()
      })
    ))
  }

  async getVicino() {
    return await firebase.firestore()
      .collection('vicino')
      .get()
      .then((res) => res.docs.map(doc => {
        return doc.data()
      }
    ))
  }


}
