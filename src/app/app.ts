import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MasterService } from './service/master-service';

@Component({
  selector: 'app-root',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  router = inject(Router)
  masterService = inject(MasterService)

  ngOnInit(): void {
    this.masterService.readLoggedUserFromStorage()
  }

  logout() {
    localStorage.removeItem("loggedUser")
    this.masterService.readLoggedUserFromStorage()
    this.router.navigateByUrl("/login")
  }

  
}
