import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ludy-aside-left',
  templateUrl: './aside-left.component.html',
  styleUrls: ['./aside-left.component.css'],
})
export class AsideLeftComponent {
  about: any;

  constructor(private router: Router) {}

  ludyLogout() {
    //window.alert("tu veux sortir");
    this.router.navigate(['login']);
  }
}
