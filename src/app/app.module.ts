import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { LoginComponent } from './components/user/login/login.component';
import { ShipmentsComponent } from './components/shipments/shipments/shipments.component';
import { AuthGuard } from './auth/auth.guard';
import { CreateShipmentComponent } from './components/shipments/create-shipment/create-shipment.component';
import { ShipmentDetailComponent } from './components/shipments/shipment-detail/shipment-detail.component';
import { HauliersComponent } from './components/hauliers/hauliers/hauliers.component';

const appRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shipments', component: ShipmentsComponent, canActivate:[AuthGuard], pathMatch:'full' },
  { path: 'createShipment', component: CreateShipmentComponent, canActivate:[AuthGuard], pathMatch:'full' },
  { path: 'shipments/:id', component: ShipmentDetailComponent, canActivate:[AuthGuard], pathMatch:'full' },
  { path: 'hauliers', component: HauliersComponent, canActivate:[AuthGuard], pathMatch:'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    ShipmentsComponent,
    CreateShipmentComponent,
    ShipmentDetailComponent,
    HauliersComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes, { enableTracing: true }
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
