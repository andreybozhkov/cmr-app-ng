import { Component } from '@angular/core';
import { Haulier } from 'src/app/dataClasses/haulier';
import { HaulierService } from 'src/app/services/haulier/haulier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-haulier',
  templateUrl: './create-haulier.component.html',
  styleUrls: ['./create-haulier.component.css']
})
export class CreateHaulierComponent {
  haulier: Haulier = {
    _id: '',
    name: '',
    contactEmails: []
  }
  emailField: string;
  constructor(private haulierService: HaulierService, private router: Router) { }

  onSubmit() {
    let haulierData = {
      name: this.haulier.name,
      contactEmails: this.haulier.contactEmails
    }
    this.haulierService.addHaulier(haulierData).subscribe(r => {
      console.log(r);
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
