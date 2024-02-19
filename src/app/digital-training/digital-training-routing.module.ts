import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigitaltrainingComponent } from './digitaltraining/digitaltraining.component';

const routes: Routes = [
  {
  path: "", component: DigitaltrainingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalTrainingRoutingModule { }
