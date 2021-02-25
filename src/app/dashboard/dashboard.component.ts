import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  profileForm = this.fb.group({
    trova: ['', Validators.required],
    vicino: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.profileForm.value)
  }

}
