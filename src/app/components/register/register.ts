import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { UserService } from '../../service/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  userService = inject(UserService)
  router = inject(Router)

  userForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required]),
    role: new FormControl(0)
  })

  formToUser(): User {
      return {
        id: 0,
        username: this.userForm.value.username,
        password: this.userForm.value.password,
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        phone: this.userForm.value.phone,
        balance: 0,
        active: true,
        role: this.userForm.value.role
      }
    }

  saveNewUser() {
    this.userService.addUser(this.formToUser()).subscribe({
      next:()=>{
        alert("account created. you will be redirected to login page, where you can log in with your username and password")
        this.router.navigateByUrl("/login")
      },
      error:(error)=>{
        alert("error: " + error)
      }
    });
  }

}
