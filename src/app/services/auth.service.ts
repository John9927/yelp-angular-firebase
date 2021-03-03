import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { GeoFire } from 'geofire';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

    drRef: any;
    geoFire: any;

    hits = new BehaviorSubject([])

  constructor(private firestore: AngularFirestore) {

    this.drRef = this.firestore.collection('citta');
    // this.geoFire = new GeoFire(this.drRef.$ref);
    // con questa riga non funziona
  }

  setLocation(key: string, coord: Array<number>) {
    this.geoFire.set(key, coord)
    .then(_ => console.log('location updated'))
    .catch(err => console.log(err))
  }

  getLocation(radius: number, coords: Array<number>) {
    this.geoFire.query({
      center: coords,
      radius: radius
    })
    .subscribe('key_entered', (key, location, distance) => {
      let hit = {
        location: location,
        distance: distance
      }

      let currentHits = this.hits.value
      currentHits.push(hit)
      this.hits.next(currentHits)
    })
  }



  // getCity() {
  //  return this.firestore
  //   .collection('vicino', ref => ref)
  //   .get()
  //   // .collection('vicino', ref => ref.where('prezzo', '==', '€'))
  //   // .get()
  // }






}
