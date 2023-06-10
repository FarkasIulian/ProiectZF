import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Autoshop';
  subtitle = 'Ceva';
  optional = '';
  Click(){
    this.title = "WOW";
    this.subtitle = "zebra";
  }
  Click2(){
    this.title = "Autoshop";
    this.subtitle = "Ceva";
  }
  receiveData(ceva:string){
    this.optional = ceva;
  }

}

