import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { CustomerFarmerComponent } from './market-ecosystem/customer-farmer/customer-farmer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { FarmerAgrodealerComponent } from './growers-ecosystem/farmer-agrodealer/farmer-agrodealer.component';
import { MarketMainComponent } from './market-ecosystem/market-main/market-main.component';
import { GrowerMainComponent } from './growers-ecosystem/grower-main/grower-main.component';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CustomerDriverComponent } from './market-ecosystem/customer-driver/customer-driver.component';
import { FarmerDriverComponent } from './growers-ecosystem/farmer-driver/farmer-driver.component';
import { FarmerServiceProviderComponent } from './growers-ecosystem/farmer-service-provider/farmer-service-provider.component';
import { OrdersComponent } from './manage-transactions/orders/orders.component';
import { AllTransactionsComponent } from './growers-ecosystem/all-transactions/all-transactions.component';
import { AllMarketTransactionsComponent } from './market-ecosystem/all-market-transactions/all-market-transactions.component';

@NgModule({
  declarations: [
    CustomerFarmerComponent,
    FarmerAgrodealerComponent,
    FarmerDriverComponent,
    FarmerServiceProviderComponent,
    MarketMainComponent,
    GrowerMainComponent,
    CustomerDriverComponent,
    OrdersComponent,
    AllTransactionsComponent,
    AllMarketTransactionsComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    NgApexchartsModule,
    ComponentsModule,
    SharedModule,
    MatCardModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TransactionsModule { }