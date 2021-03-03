import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  getPescara: any | undefined;
  lat: number;
  lng: number;
  markers: any;
  constructor(private geo: AuthService) { }

  ngOnInit() {
    this.getUserLocation()
    this.geo.hits.subscribe(hits => this.markers = hits)

  }

  private getUserLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.geo.getLocation(500, [this.lat, this.lng])
      });
    }
  }
}
