import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/ludyServices/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.handleLoginCallback();
  }

  private async handleLoginCallback() {
    try {
      //await this.authService.loginCallback(window.location.href);
      this.router.navigate(['/']); // Verwende navigate anstelle von push in Angular
    } catch (error) {
      console.error(error);
    }
  }

  
}
