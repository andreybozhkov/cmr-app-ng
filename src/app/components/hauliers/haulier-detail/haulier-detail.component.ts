import { Component, OnInit } from '@angular/core';
import { HaulierService } from 'src/app/services/haulier/haulier.service';
import { Haulier } from 'src/app/dataClasses/haulier';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-haulier-detail',
  templateUrl: './haulier-detail.component.html',
  styleUrls: ['./haulier-detail.component.css']
})
export class HaulierDetailComponent implements OnInit {
  haulier: Haulier = {
    _id: '',
    name: '',
    contactEmails: []
  }
  emailField: string;
  constructor(private haulierService: HaulierService, private router: Router, private route: ActivatedRoute) { }
  haulierId: string = this.route.snapshot.paramMap.get('id');

  ngOnInit() {
    this.haulierService.getHaulierById(this.haulierId).subscribe(haulier => {
      this.haulier = {
        _id: haulier._id,
        name: haulier.name,
        contactEmails: haulier.contactEmails
      };
    })
  }

  onSubmit() {
    let haulierData = {
      name: this.haulier.name,
      contactEmails: this.haulier.contactEmails
    }
    this.haulierService.editHaulier(this.haulierId, haulierData).subscribe(r => {
      this.router.navigate(['/hauliers']);
    })
  }

  addEmailToList(): void {
    this.haulier.contactEmails.push(this.emailField.trim());
    this.emailField = '';
  }

  removeEmail(email: string): void {
    this.haulier.contactEmails.splice(this.haulier.contactEmails.indexOf(email), 1);
  }
}
