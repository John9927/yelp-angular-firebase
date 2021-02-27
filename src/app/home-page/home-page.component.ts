import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  getPescara: any | undefined;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    // this.authService.getPescara()
    // .then(nomi => {
    //   this.getPescara = nomi
    // })
  }

  lat = 42.4621097;
  lng = 14.2186796;

}
