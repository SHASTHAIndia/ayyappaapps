import { Component, OnInit } from '@angular/core';
// import { HttpModule, Http, Response } from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';
// import { Observable } from '../../../node_modules/rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  private users: Array<object> = [];

  ngOnInit() {
    this.getUsers();
  }

  public getUsers() {
    this.apiService.getUsers().subscribe((data: Array<object>) => {
      this.users = data;
      // console.log(data);
    });
  }

}
