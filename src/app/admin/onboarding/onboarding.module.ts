import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { FarmerOnboardingComponent } from './farmer-onboarding/farmer-onboarding.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
// import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { LOCALE_ID } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AdminOnboardingComponent } from './admin-onboarding/admin-onboarding.component';
// import { NgIf, NgFor } from '@angular/common';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { StaffOnboardingComponent } from './staff-onboarding/staff-onboarding.component';
import { AgribusinessOnboardingComponent } from './agribusiness-onboarding/agribusiness-onboarding.component';
import { CustomerOnboardingComponent } from './customer-onboarding/customer-onboarding.component';
import { DriverOnboardingComponent } from './driver-onboarding/driver-onboarding.component';
import { WarehouseOnboardingComponent } from './warehouse-onboarding/warehouse-onboarding.component';
import { MatIconModule } from '@angular/material/icon';
import { ValueChainComponent } from './value-chain/value-chain.component';
// import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';

const lang = 'en-US';

@NgModule({
  declarations: [
    FarmerOnboardingComponent,
    ServiceProviderComponent,
    AdminOnboardingComponent,
    ManufacturerComponent,
    StaffOnboardingComponent,
    AgribusinessOnboardingComponent,
    CustomerOnboardingComponent,
    DriverOnboardingComponent,
    WarehouseOnboardingComponent,
    ValueChainComponent
  ],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    HttpClientModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    // NgxMatIntlTelInputModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: lang }
  ]
})
export class OnboardingModule { }
