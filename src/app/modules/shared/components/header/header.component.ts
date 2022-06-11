import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Sin usuario',
        items: [
          {
            label: 'Iniciar sesión',
            icon: 'pi pi-sign-in',
            routerLink: '/login',
          },
          {
            label: 'Crear usuario',
            icon: 'pi pi-user-plus',
            routerLink: '/register',
          },
        ],
      },
    ];
  }
}
