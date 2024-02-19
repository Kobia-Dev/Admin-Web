import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriversComponent } from './drivers/drivers.component';
import { DriverOnboardingComponent } from '../admin/onboarding/driver-onboarding/driver-onboarding.component';

const routes: Routes = [
  { path: "", component: DriversComponent },
  { path: "drivers", component: DriversComponent },
  {path: "app-driver-onboarding", component: DriverOnboardingComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DriverRoutingModule { }
