import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmerOnboardingComponent } from './farmer-onboarding/farmer-onboarding.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
import { AdminOnboardingComponent } from './admin-onboarding/admin-onboarding.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { StaffOnboardingComponent } from './staff-onboarding/staff-onboarding.component';
import { AgribusinessOnboardingComponent } from './agribusiness-onboarding/agribusiness-onboarding.component';
import { CustomerOnboardingComponent } from './customer-onboarding/customer-onboarding.component';
import { DriverOnboardingComponent } from './driver-onboarding/driver-onboarding.component';
import { WarehouseOnboardingComponent } from './warehouse-onboarding/warehouse-onboarding.component';
import { ValueChainComponent } from './value-chain/value-chain.component';

const routes: Routes = [
  { path: "", component: FarmerOnboardingComponent },
  { path: "farmer-onboarding", component: FarmerOnboardingComponent },
  { path: "serviceProvider-onboarding", component: ServiceProviderComponent },
  { path: "admin-onboarding", component: AdminOnboardingComponent },
  { path: "manufacturer-onboarding", component: ManufacturerComponent },
  { path: "staff-onboarding", component: StaffOnboardingComponent },
  { path: "agribusiness-onboarding", component: AgribusinessOnboardingComponent },
  { path: "customer-onboarding", component: CustomerOnboardingComponent },
  { path: "driver-onboarding", component: DriverOnboardingComponent },
  { path: "warehouse-onboarding", component: WarehouseOnboardingComponent },
  { path: 'valueChain-onboarding', component:ValueChainComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
