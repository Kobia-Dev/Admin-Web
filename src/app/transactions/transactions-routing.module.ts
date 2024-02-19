import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketMainComponent } from './market-ecosystem/market-main/market-main.component';
import { GrowerMainComponent } from './growers-ecosystem/grower-main/grower-main.component';
import { OrdersComponent } from './manage-transactions/orders/orders.component';

const routes: Routes = [
  { path: "grower-ecosystem", component:GrowerMainComponent},
  { path: "market-ecosystem", component:MarketMainComponent },
  { path: "manage-transactions", component:OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
