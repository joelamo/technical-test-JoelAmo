import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import Toast from 'src/app/global/models/Toast';
import UserApiModel from 'src/app/modules/auth/models/UserApiModel';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: [
      '',
      {
        validators: [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ],
      },
    ],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {}

  signUp() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const user: UserApiModel = {
      name: this.registerForm.controls['name'].value,
      surname: this.registerForm.controls['surname'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
    }

    this.authService.signUp(user).subscribe({
      next: () => this.handleSignUpSuccess(),
      error: err => this.handleSignUpError(err),
    })
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

  handleSignUpSuccess(){
    const message: Toast = {
      severity: 'success',
      summary: 'Hecho!',
      detail: 'Usuario creado correctamente',
      icon: 'pi pi-check-circle',
    };

    this.addMessage(message);
    setTimeout(() => {
      this.messageService.clear();
      this.router.navigate(['/login']);
    }, 1500);
  }

  handleSignUpError(error: any){
    const message: Toast = {
      severity: 'error',
      summary: 'Error!',
      detail: 'El email ya existe',
      icon: 'pi pi-exclamation-triangle',
    };
    
    this.addMessage(message);
     
  }
}
