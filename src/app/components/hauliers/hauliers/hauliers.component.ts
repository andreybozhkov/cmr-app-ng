import { Component, OnInit } from '@angular/core';
import { Haulier } from 'src/app/dataClasses/haulier';

@Component({
  selector: 'app-hauliers',
  templateUrl: './hauliers.component.html',
  styleUrls: ['./hauliers.component.css']
})
export class HauliersComponent implements OnInit {
  hauliers: Array<Haulier>;

  constructor() { }

  ngOnInit() {
  }

}
