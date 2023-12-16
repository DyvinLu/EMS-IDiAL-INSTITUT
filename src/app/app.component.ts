import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-visualisierung';

  constructor(private route:ActivatedRoute){}

  checkRoute():boolean{
    console.log(this.route.pathFromRoot[1].snapshot.url[0].path);
    return true;
  }
}
