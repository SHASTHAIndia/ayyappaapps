import { Component, OnInit } from '@angular/core';
import {DataService} from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
