import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessorsRoutingModule } from './processors-routing.module';
import { AgriProcessorsComponent } from './agri-processors/agri-processors.component';
import { ComponentsModule } from "../shared/components/components.module";
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MarketPlaceRoutingModule } from '../market-place/market-place-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        AgriProcessorsComponent
    ],
    imports: [
        CommonModule,
        ProcessorsRoutingModule,
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
export class ProcessorsModule { }
