import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleHeaderComponent } from './role-header/role-header.component';

const routes: Routes = [
  { path: "role-header", component: RoleHeaderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
