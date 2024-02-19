import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorsComponent } from './actors/actors.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';

const routes: Routes = [
  { path: "", component: ActorsComponent },
  { path: "actors", component: ActorsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }