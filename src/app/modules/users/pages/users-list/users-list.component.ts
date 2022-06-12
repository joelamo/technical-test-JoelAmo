import { Component, OnInit } from '@angular/core';
import UserViewModel from '../../models/UserViewModel';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  count!: number;
  users: UserViewModel[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe((data) => {
      console.log(data);
      this.users = data.items;
      this.count = data.count;
    });
  }

  edit(user: UserViewModel) {}

  delete(id: string) {}
}
