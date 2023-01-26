import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(public route: Router) {}

  // username: string = '';
  // password: string = '';
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  status: string = 'Admin';
  isAdminLoggedIn: boolean = false;

  loginForm = new FormGroup({
    username: this.username,
    password: this.password,
  });

  adminLogin() {
    if (
      this.status === 'Admin' &&
      this.loginForm.value.username === 'admin' &&
      this.loginForm.value.password === 'admin'
    ) {
      this.isAdminLoggedIn = true;
      this.route.navigate(['dashboard']);
    }
  }

  adminLogOut() {
    this.loginForm.value.username = '';
    this.loginForm.value.password = '';
    this.isAdminLoggedIn = false;
    this.route.navigate(['']);
  }
}
