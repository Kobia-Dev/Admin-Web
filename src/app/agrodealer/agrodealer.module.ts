import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgrodealerRoutingModule } from './agrodealer-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AgriBusinessComponent } from './agri-business/agri-business.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ViewAgribusinessComponent } from './view-agribusiness/view-agribusiness.component';
import { DeleteAgribusinessComponent } from './delete-agribusiness/delete-agribusiness.component';
import { FormsModule } from '@angular/forms';
import { MarketPlaceRoutingModule } from '../market-place/market-place-routing.module';
import { AgrodealerDistributionComponent } from './agrodealer-distribution/agrodealer-distribution.component';
import { DeactivateAgribusinessComponent } from './deactivate-agribusiness/deactivate-agribusiness.component';


@NgModule({
  declarations: [
    AgriBusinessComponent,
    PieChartComponent,
    ViewAgribusinessComponent,
    DeleteAgribusinessComponent,
    AgrodealerDistributionComponent,
    DeactivateAgribusinessComponent
  ],
  imports: [
    AgrodealerRoutingModule,
    CommonModule,
    ComponentsModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatTableExporterModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    MatSortModule,
    NgApexchartsModule,
    MatButtonToggleModule,
    MarketPlaceRoutingModule,
    FormsModule
  ]
})
export class AgrodealerModule { }
