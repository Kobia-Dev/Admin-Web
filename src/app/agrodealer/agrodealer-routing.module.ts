import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgriBusinessComponent } from './agri-business/agri-business.component';

const routes: Routes = [
  {
    path: "agro-dealers", component:AgriBusinessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgrodealerRoutingModule { }
