import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  router = inject(Router)
  authService = inject(AuthService)

  ngOnInit(): void {
    this.authService.readLoggedUserFromStorage()
  }

  logout() {
    localStorage.clear()
    this.authService.readLoggedUserFromStorage()
    this.router.navigateByUrl("/login")
  }

  
}
