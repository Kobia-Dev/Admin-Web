import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActorsComponent } from './actors/actors.component';
import { GenWidgetsComponent } from './gen-widgets/gen-widgets.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TransactionsComponent } from './transactions/transactions.component';
import { MixedTransactionsBarComponent } from './mixed-transactions-bar/mixed-transactions-bar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CustomerTransactionsComponent } from './customer-transactions/customer-transactions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ActorPerRegionComponent } from './actor-per-region/actor-per-region.component';

@NgModule({
  declarations: [
    ActorsComponent,
    GenWidgetsComponent,
    TransactionsComponent,
    MixedTransactionsBarComponent,
    CustomerTransactionsComponent,
    ActorPerRegionComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    SharedModule,
    MatCardModule,
    NgApexchartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
  ]
})
export class DashboardModule { }
