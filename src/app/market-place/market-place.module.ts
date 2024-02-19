import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketPlaceRoutingModule } from './market-place-routing.module';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TypeOfProductTableComponent } from './type-of-product-table/type-of-product-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddProductTypeComponent } from './add-product-type/add-product-type.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MarketComponent } from './market/market.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FarmersProductsComponent } from './farmers-products/farmers-products.component';
import { FormsModule } from '@angular/forms';
import { AgrodealerProductsComponent } from './agrodealer-products/agrodealer-products.component';
import { VerifyProductComponent } from './verify-product/verify-product.component';
import { DeleteProductCategoryComponent } from './delete-product-category/delete-product-category.component';
import { ViewProductCategoryComponent } from './view-product-category/view-product-category.component';
import { DeletProductTypeComponent } from './delet-product-type/delet-product-type.component';
import { ViewProductTypeComponent } from './view-product-type/view-product-type.component';
import { ViewProductDetailsComponent } from './view-product-details/view-product-details.component';

@NgModule({
  declarations: [
    TypeOfProductTableComponent,
    AddProductCategoryComponent,
    AddProductTypeComponent,
    ProductCategoriesComponent,
    MarketComponent,
    FarmersProductsComponent,
    AgrodealerProductsComponent,
    VerifyProductComponent,
    DeleteProductCategoryComponent,
    ViewProductCategoryComponent,
    DeletProductTypeComponent,
    ViewProductTypeComponent,
    ViewProductDetailsComponent
  ],
  imports: [
    CommonModule,
    MarketPlaceRoutingModule,
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
    MatButtonToggleModule,
    FormsModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class MarketPlaceModule { }
