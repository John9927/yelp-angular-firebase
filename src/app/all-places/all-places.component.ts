import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/app';

export interface Item {
  prezzo1: string;
  prezzo2: string;
  prezzo3: string;
  tipo: string;
  citta: string;
}
@Component({
  selector: 'app-all-places',
  templateUrl: './all-places.component.html',
  styleUrls: ['./all-places.component.scss']
})
export class AllPlacesComponent implements OnInit{

  items$: Observable<Item[]>
  prezzo1$: BehaviorSubject<string|null>;
  prezzo2$: BehaviorSubject<string|null>;
  prezzo3$: BehaviorSubject<string|null>;
  tipo$: BehaviorSubject<string|null>;
  citta$: BehaviorSubject<string|null>;

  constructor(private fb: FormBuilder, private router: Router, private afs: AngularFirestore, public geo: AuthService) {
    this.prezzo1$ = new BehaviorSubject(null);
    this.prezzo2$ = new BehaviorSubject(null);
    this.prezzo3$ = new BehaviorSubject(null);
    this.tipo$ = new BehaviorSubject(null);
    this.citta$ = new BehaviorSubject(null);

    this.items$ = combineLatest([
      this.prezzo1$,
      this.prezzo2$,
      this.prezzo3$,
      this.tipo$,
      this.citta$,
    ]).pipe(
      switchMap(([prezzo1, prezzo2, prezzo3, tipo, citta]) =>
      afs.collection<Item>('vicino', ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (prezzo1) { query = query.where('locale.prezzo', '==', prezzo1)};
          if (prezzo2) { query = query.where('locale.prezzo', '==', prezzo2)};
          if (prezzo3) { query = query.where('locale.prezzo', '==', prezzo3)};
          if (tipo) { query = query.where('locale.tipo', '==', tipo)};
          if (citta) { query = query.where('idCitta', '==', citta)};
          return query;
        }).valueChanges()
        )
        );
  }

  filterPrezzo1(prezzo1: string|null) {
    this.prezzo1$.next(prezzo1);
  }
  filterPrezzo2(prezzo2: string|null) {
    this.prezzo2$.next(prezzo2);
  }
  filterPrezzo3(prezzo3: string|null) {
    this.prezzo3$.next(prezzo3);
  }
  filterRistorante(tipo: string|null) {
    this.tipo$.next(tipo);
  }
  filterCitta(citta: string| null) {
    this.citta$.next(citta);
  }


  ngOnInit() {
  // this.getFilterTipos()
  }

  // getFilterTipos() {
  //   this.geo.getFilterTipo()
    // console.log(this.tipos)
  // }


}
