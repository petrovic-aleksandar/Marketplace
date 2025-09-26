import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  userService = inject(UserService)
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
        this.router.navigateByUrl("/homepage")
        
      } else {
        alert("Wrong password!")
      }
    })
  }

}
