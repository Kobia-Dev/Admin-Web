import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MarketPlaceService } from '../services/market-place.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddProductTypeComponent } from '../add-product-type/add-product-type.component';
import { DeletProductTypeComponent } from '../delet-product-type/delet-product-type.component';
import { ViewProductTypeComponent } from '../view-product-type/view-product-type.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-type-of-product-table',
  templateUrl: './type-of-product-table.component.html',
  styleUrls: ['./type-of-product-table.component.sass']
})
export class TypeOfProductTableComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['no', 'typeOfProduct','description', 'units', 'productCategory', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoading = true;
  types: any;

  constructor(
    private marketPlace: MarketPlaceService,
    private dialog: MatDialog,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.getProductsType();
    this.dataService.getUpdateData().subscribe(() => {
      this.getProductsType();
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public addProductType(){
    const dialogConfig = new MatDialogConfig()
      dialogConfig.disableClose = true
      dialogConfig.autoFocus = true
      dialogConfig.width = '600px'
      dialogConfig.data = { test: "data" }
  
      const dialogRef = this.dialog.open(AddProductTypeComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
      });
  }

  public refresh(){
    this.getProductsType();
  }

  public getProductsType(){
    this.marketPlace.getTypeOfProducts().subscribe({
      next: ((res) => {
        this.types = res.entity;
        console.log("Type of products", this.types)
        if (this.types){
          this.isLoading = false;
        }
        this.dataSource = new MatTableDataSource(this.types);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }),
      error: ((error) => {
        console.log("Error fetchin types of products", error);
      }),
      complete: (() => {})
    })
  }

  public openDeleteConfirmationDialog(row: any){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '600px'
    dialogConfig.data = { rowData: row }

    const dialogRef = this.dialog.open(DeletProductTypeComponent, dialogConfig);


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

    const dialogRef = this.dialog.open(ViewProductTypeComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });
  }

}
