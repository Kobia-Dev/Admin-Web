import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/admin/services/snackbar.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { ProductCategoriesComponent } from '../product-categories/product-categories.component';
import { MarketPlaceService } from '../services/market-place.service';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.css']
})
export class ViewProductDetailsComponent implements OnInit {

  rowData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<ProductCategoriesComponent>,
    private formBuilder: FormBuilder,
    private marketService: MarketPlaceService,
    private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.rowData = this.data.rowData;
    console.log('Row Data:', this.rowData);
  }

}
