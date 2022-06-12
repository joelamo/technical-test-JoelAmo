import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import User from 'src/app/global/models/User';
import { GlobalService } from 'src/app/global/services/global.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(
    private globalService: GlobalService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.globalService.user;
    this.fillItems(user);
    this.globalService.userEmitter.subscribe((user) => this.fillItems(user));
  }

  fillItems(user: User | null) {
    if (user) {
      this.items = [
        {
          label: `${user.name}`,
          items: [
            {
              label: 'Cerrar sesión',
              icon: 'pi pi-sign-out',
              routerLink: '/login',
              command: () => {
                this.logout();
              },
            },
          ],
        },
      ];
    } else {
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

  logout() {
    this.authService.logout();
  }
}
