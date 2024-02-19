import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgApexchartsModule } from 'ng-apexcharts';

import { PieChartComponent } from './piechart/piechart.component';
import { BarchartComponent } from './bargraph/bargraph.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import { ViewDetailsComponent } from './view-details/view-details.component';

@NgModule({
  declarations:
    [ViewComponent,
      BarchartComponent,
      PieChartComponent,
      DeleteCustomerComponent,
      ViewDetailsComponent],

  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule,
    ComponentsModule,
    MatCardModule,
    NgApexchartsModule,
    MatTableModule,
    MatIconModule,
    MatTableExporterModule,
    MatMenuModule,
    MatPaginatorModule

  ],
})
export class CustomersModule { }