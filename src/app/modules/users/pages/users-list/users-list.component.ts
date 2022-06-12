import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import Toast from 'src/app/global/models/Toast';
import UserViewModel from '../../models/UserViewModel';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class UsersListComponent implements OnInit {
  count!: number;
  users: UserViewModel[] = [];

  constructor(
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe((data) => {
      console.log(data);
      this.users = data.items;
      this.count = data.count;
    });
  }

  edit(user: UserViewModel) {
    this.usersService.updateUser(user).subscribe({
      next: () => this.handleEditSuccess(),
      error: () => this.handleError(),
    });
  }

  delete(id: string) {
    this.confirmationService.confirm({
      message: '¿Estás seguro?',
      accept: () => {
        this.usersService.deleteUser(id).subscribe({
          next: () => this.handleDeleteSuccess(id),
          error: () => this.handleError(),
        });
      },
    });
  }

  handleEditSuccess() {
    const message: Toast = {
      severity: 'success',
      summary: 'Hecho!',
      detail: 'Usuario modificado con éxito',
      icon: 'pi pi-check-circle',
    };

    this.addMessage(message);
  }

  handleDeleteSuccess(id: string) {
    this.users = this.users.filter((user) => user.id !== id);

    const message: Toast = {
      severity: 'success',
      summary: 'Hecho!',
      detail: 'Usuario borrado con éxito',
      icon: 'pi pi-check-circle',
    };

    this.addMessage(message);
  }

  handleError() {
    const message: Toast = {
      severity: 'error',
      summary: 'Error!',
      detail: 'Ha ocurrido un error',
      icon: 'pi pi-check-circle',
    };

    this.addMessage(message);
  }

  addMessage(message: Toast) {
    this.messageService.add({
      key: 'toast',
      severity: message.severity,
      summary: message.summary,
      detail: message.detail,
      icon: message.icon,
    });
  }
}
