import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmersRoutingModule } from './farmers-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgApexchartsModule } from "ng-apexcharts";
import { ViewComponent } from './view/view.component';
import { BarchartComponent } from './bargraph/bargraph.component';
import { PieChartComponent } from './piechart/piechart.component';
import { FarmersDistributionComponent } from './farmers-distribution/farmers-distribution.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    ViewComponent,
    PieChartComponent,
    BarchartComponent,
    FarmersDistributionComponent
  ],

  imports: [
    CommonModule,
    FarmersRoutingModule,
    SharedModule,
    ComponentsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatTableExporterModule,
    MatMenuModule,
    MatPaginatorModule,
    NgApexchartsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class FarmersModule { }
