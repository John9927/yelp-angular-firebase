import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firestore: AngularFirestore) { }
  getCity() {
   return this.firestore
    // .collection('vicino', ref =>ref)
    // .get()
    .collection('vicino', ref => ref.where('prezzo', '==', '€'))
    .get()
  }





}
