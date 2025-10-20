import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegUser } from '../../model/request/reg-user';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  authService = inject(AuthService)
  router = inject(Router)

  userForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required]),
  })

  formToRegUser(): RegUser {
    return {
      username: this.userForm.value.username,
      password: this.userForm.value.password,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
    }
  }

  resetForm() {
    this.userForm.reset()
  }

  saveNewUser() {
    this.authService.register(this.formToRegUser()).subscribe({
      next: () => {
        alert("Account created. you will be redirected to login page, where you can log in with your username and password.")
        this.router.navigateByUrl("/login")
      },
      error: (err) => {
        if (err.status == 200) {
          alert("Account created. you will be redirected to login page, where you can log in with your username and password!")
          this.router.navigateByUrl("/login")
        }
        if (err.status == 409) {
          alert("Username already exists. Please choose another username.")
        } else {
          console.log(err)
          alert("error: " + err.error)
        }
      }
    });
  }

}
