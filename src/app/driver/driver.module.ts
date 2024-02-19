import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DriversComponent } from './drivers/drivers.component';
import { MatCardModule } from '@angular/material/card';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { DriverOnboardingComponent } from '../admin/onboarding/driver-onboarding/driver-onboarding.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from "../shared/components/components.module";
import { ViewDriverComponent } from './view-driver/view-driver.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DriversDistributionComponent } from './drivers-distribution/drivers-distribution.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
    declarations: [
        DriversComponent,
        PieChartComponent,
        ViewDriverComponent,
        DeleteDriverComponent,
        DriversDistributionComponent,
        // DriverOnboardingComponent 
    ],
    providers: [],
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        DriverRoutingModule,
        MatSortModule,
        NgApexchartsModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatSelectModule,
        MatCardModule,
        MatDialogModule,
        ReactiveFormsModule,
        ComponentsModule
    ]
})
export class DriverModule {}
  