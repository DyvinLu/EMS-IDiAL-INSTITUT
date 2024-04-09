import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginObj: any = {
    userName: '',
    password: '',
  };

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((res) => {
      debugger;
      console.log(res);
    });
  }

  onLogin() {
    // chandle callback here
    //window.open("http://sems.vms.idial.fh:8086/signin", "_blank");
    //this.document.location.href = "http://sems.vms.idial.fh:8086/signin";
    /*setTimeout(()=>{                           // <<<---using ()=> syntax
      this.auth.getLoginInfos();

      if(this.auth.userIsActive){
        this.document.location.href = "http:/localhost:4200";
      }
  
    }, 20000); // 10 secondes

    */
  }
}
