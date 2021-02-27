import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject, Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tagsTrova: any | undefined;
  tagsVicino: any | undefined;
  getPescara: any | undefined;
  showDropDown: boolean = false;
  showDropDown2: boolean = false;

  searchTrova: string;
  searchVicino: string;
  startAt = new Subject();
  endAt = new Subject();

  trova;
  vicino;

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  profileForm = this.fb.group({
    trova: ['', Validators.required],
    vicino: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private afs: AngularFirestore) { }


  ngOnInit() {

    const combinedTrova = combineLatest(this.startAt, this.endobs)
    combinedTrova.subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((trova) => {
        this.trova = trova;
      })
    })

    const combinedVicino = combineLatest(this.startAt, this.endobs)
    combinedVicino.subscribe((value) => {
      this.firequery2(value[0], value[1]).subscribe((vicino) => {
        this.vicino = vicino;
      })
    })

  }

  search($event) {
    let q = $event.target.value;
    this.startAt.next(q);
    this.endAt.next(q + "\uf8ff");
  }

  search2($event) {
    let q = $event.target.value;
    this.startAt.next(q);
    this.endAt.next(q + "\uf8ff");
  }

  firequery(start, end) {
    return this.afs.collection('trova', ref => ref.limit(4).orderBy('trova').startAt(start).endAt(end)).valueChanges()
  }

  firequery2(start, end) {
    return this.afs.collection('vicino', ref => ref.limit(4).orderBy('vicino').startAt(start).endAt(end)).valueChanges()
  }

  onSubmit() {
    console.log(this.profileForm.value);
    this.router.navigateByUrl('home-page');
  }

  selectValueVicino(value) {
    this.profileForm.patchValue(value);
    this.showDropDown2 = false;
  }

  selectValueTrova(value) {
    this.profileForm.patchValue(value);
    this.showDropDown = false;
  }

  toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  toggleDropDown2() {
    this.showDropDown2 = !this.showDropDown2;
  }
}
