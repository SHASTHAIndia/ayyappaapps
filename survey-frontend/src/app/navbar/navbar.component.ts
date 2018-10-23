import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  message: any;
  survName: String;
  title = 'admprof';
  constructor(private dataservice: DataService) {}
  ngOnInit() {
  this.dataservice.currentMessage.subscribe(message => this.message = message); }
  receiveMessage($event) {
    this.survName = $event;
  }
}
