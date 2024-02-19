import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MarketPlaceService } from '../services/market-place.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddProductCategoryComponent } from '../add-product-category/add-product-category.component';
import { DeleteProductCategoryComponent } from '../delete-product-category/delete-product-category.component';
import { ViewProductCategoryComponent } from '../view-product-category/view-product-category.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.sass']
})
export class ProductCategoriesComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['no', 'productCategory', 'description', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  @ViewChild(MatSort) sort: MatSort;
  isLoading = true;
  products: any;

  constructor(
    private marketPlace: MarketPlaceService,
    private dialog: MatDialog,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.getProducts();
    this.dataService.getUpdateData().subscribe(() => {
      this.getProducts(); 
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public addProductCategory() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '600px'
    dialogConfig.data = { test: "data" }

    const dialogRef = this.dialog.open(AddProductCategoryComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });
  }

  public refresh() {
    this.getProducts();
  }

  public getProducts() {
    this.marketPlace.getProductCategories().subscribe({
      next: ((res) => {
        this.products = res.entity;
        console.log("Products list:", this.products);
        if (this.products) {
          this.isLoading = false
        }
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }),
      error: ((error) => {
        console.log("Error fetching products", error);
      }),
      complete: (() => { })
    })
  }

  public openDeleteConfirmationDialog(row: any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '600px'
    dialogConfig.data = { rowData: row }

    const dialogRef = this.dialog.open(DeleteProductCategoryComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });
  }

  public openViewConfirmationDialog(row: any){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '600px'
    dialogConfig.data = { rowData: row }

    const dialogRef = this.dialog.open(ViewProductCategoryComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });
  }

}
