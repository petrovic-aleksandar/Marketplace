import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user-service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  userService = inject(UserService)
  authService = inject(AuthService)
  router = inject(Router)

  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  login() {
    this.userService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      (result) => {
      const loggedUser: any = result;
      localStorage.setItem("loggedUser", loggedUser.username)
      localStorage.setItem("loggedUserId", loggedUser.id)
      localStorage.setItem("loggedUserRole", this.mapUserRole(loggedUser.role))
      this.authService.readLoggedUserFromStorage()
      this.router.navigateByUrl("/homepage")
    },
    (error: HttpErrorResponse) => {
      if (error.status==401)
        alert("Wrong password")
      if (error.status==400)
        alert("Wrong credentials")
    })
  }

  mapUserRole(roleNum: number): string {
    if (roleNum == 0)
      return "User"
    if (roleNum == 1)
      return "Admin"
    return ""
  }

}
