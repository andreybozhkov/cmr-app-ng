import { Component, DoCheck} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'CMR App Angular';
  authToken : boolean = false;

  ngDoCheck() {
    if(!this.authToken && sessionStorage.getItem('authtoken')) {
      this.authToken = true;
    }
    if(this.authToken && !sessionStorage.getItem('authtoken')) {
      this.authToken = false;
    }
  }
}
