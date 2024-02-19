import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgriProcessorsComponent } from './agri-processors/agri-processors.component';


const routes: Routes = [
  {
    path: "agri-processors", component:AgriProcessorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessorsRoutingModule { }


