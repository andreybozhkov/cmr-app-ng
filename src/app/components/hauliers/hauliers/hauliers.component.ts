import { Component, OnInit } from '@angular/core';
import { Haulier } from 'src/app/dataClasses/haulier';
import { HaulierService } from 'src/app/services/haulier/haulier.service';

@Component({
  selector: 'app-hauliers',
  templateUrl: './hauliers.component.html',
  styleUrls: ['./hauliers.component.css']
})
export class HauliersComponent implements OnInit {
  hauliers: Array<Haulier>;

  constructor(private haulierService: HaulierService) { }

  ngOnInit() {
    this.haulierService.getAllHauliers().subscribe(hauliers => {
      this.hauliers = hauliers;
      this.hauliers.sort((a,b) => {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) { return -1; }
        if (y > x) { return 1; }
        return 0;
      });
    })
  }

}
