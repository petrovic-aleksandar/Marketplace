import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user-service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth-service';

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
    this.userService.getUserByUsername(this.loginForm.value.username).subscribe((result)=>{
      const loggedUser: any = result;
      if (loggedUser.password === this.loginForm.value.password) {
        localStorage.setItem("loggedUser", loggedUser.username)
        localStorage.setItem("loggedUserId", loggedUser.id)
        localStorage.setItem("loggedUserRole", this.mapUserRole(loggedUser.role))
        this.authService.readLoggedUserFromStorage()
        this.router.navigateByUrl("/homepage")
      } else {
        alert("Wrong password!")
      }
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
