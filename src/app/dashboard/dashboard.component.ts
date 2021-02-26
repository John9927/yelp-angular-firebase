import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tagsTrova: any | undefined;
  tagsVicino: any | undefined;
  showDropDown: boolean = false;
  showDropDown2: boolean = false;

  profileForm = this.fb.group({
    trova: ['', Validators.required],
    vicino: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) { }


  ngOnInit() {
    this.authService.getTrova()
      .then(nomi =>
        this.tagsTrova = nomi
      )

    this.authService.getVicino()
      .then(nomi =>
        this.tagsVicino = nomi
      )
  }
  onSubmit() {
    console.log(this.profileForm.value)
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
