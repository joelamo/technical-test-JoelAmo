import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/gobal/global.service';
import User from 'src/app/models/User';
import { UsersService } from 'src/app/modules/users/services/users.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: [
      'test1@test1.com',
      {
        validators: [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ],
      },
    ],
    password: ['test1', Validators.required],
  });

  rememberMe: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private globalService: GlobalService,
    private usersService: UsersService,
    private router: Router,
  ) {}

  ngOnInit() {}

  signIn() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    this.authService.logIn(email, password).subscribe({
      next: (resp) => this.handleLoginSuccess(resp),
      error: (err) => this.handleSignInError(err),
    });

  }

  addMessage(message: {severity: string; summary: string; detail: string; icon: string;}) {
    this.messageService.add({
      key: 'toast',
      severity: message.severity,
      summary: message.summary,
      detail: message.detail,
      icon: message.icon,
    });
  }

  handleSignInError(error: any){
    const message = {
      severity: 'error',
      summary: 'Error!',
      detail: '',
      icon: 'pi pi-exlamation-triangle',
    };
    if (error.status === 404) {
      message.detail = 'Email o contraseñas incorrectos';
      this.addMessage(message);
      return;
    } else {
      message.detail = 'Ha ocurrido un error';
      this.addMessage(message);
    }
  }

  handleLoginSuccess(resp: any){
    const user: User = {
      accessToken: resp.accessToken,
      refreshToken: resp.accessToken,
      email: '',
      name: '',
      surname: '',
      id: '',
    };
    this.globalService.user = user;
    this.usersService.getUserData().subscribe((data) => {
      const { email, name, surname, id } = data;
      user.email = email;
      user.name = name;
      user.surname = surname;
      user.id = id;
      
      this.authService.saveUser(user, this.rememberMe);
      this.globalService.user = user;
      this.router.navigate(['/users/list']);
    });
  }
}
