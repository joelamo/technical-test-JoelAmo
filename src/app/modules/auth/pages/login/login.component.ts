import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
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

  rememberMe: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  signIn() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.addMessage('error', 'Error!', 'Email o contraseñas incorrectos', 'pi pi-exlamation-triangle')
    
  }

  addMessage(severity: string, summary: string, detail: string, icon: string){
    this.messageService.add({
      key: 'toast',
      severity,
      summary,
      detail,
      icon,
    })
  }
}
