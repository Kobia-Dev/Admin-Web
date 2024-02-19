import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';
import { TypeOfProductTableComponent } from './type-of-product-table/type-of-product-table.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { AddProductTypeComponent } from './add-product-type/add-product-type.component';
import { MarketComponent } from './market/market.component';

const routes: Routes = [
  { path: "add-product-category", component:AddProductCategoryComponent},
  { path: "add-product-type", component:AddProductTypeComponent},
  { path: "market-place", component:MarketComponent },
  { path: "product-categories", component:ProductCategoriesComponent },
  { path: "product-types", component:TypeOfProductTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketPlaceRoutingModule { }
