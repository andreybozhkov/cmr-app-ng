import { Component, DoCheck} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'CMR App Angular';
  authToken : string = '';

  ngDoCheck() {
    if(this.authToken.length === 0 && sessionStorage.getItem('authtoken')) {
      this.authToken = sessionStorage.getItem('authtoken');
      console.log(this.authToken);
    }
    if(this.authToken.length > 0 && !sessionStorage.getItem('authtoken')) {
      this.authToken = '';
      console.log(this.authToken);
    }
  }
}
