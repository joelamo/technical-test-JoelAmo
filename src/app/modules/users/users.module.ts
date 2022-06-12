import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';

import { UsersListComponent } from './pages/users-list/users-list.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    TableModule,
    ConfirmDialogModule,
  ],
  declarations: [UsersListComponent],
})
export class UsersModule {}
