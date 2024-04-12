import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'aside-left',
  templateUrl: './aside-left.component.html'
})
export class AsideLeftComponent {
  constructor(private router: Router) {}
}
