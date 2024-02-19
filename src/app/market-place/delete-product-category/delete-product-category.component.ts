import { Component, Inject, OnInit } from '@angular/core';
import { ProductCategoriesComponent } from '../product-categories/product-categories.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarketPlaceService } from '../services/market-place.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-delete-product-category',
  templateUrl: './delete-product-category.component.html',
  styleUrls: ['./delete-product-category.component.css']
})
export class DeleteProductCategoryComponent implements OnInit {

  rowData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProductCategoriesComponent>,
    private marketPlaceService: MarketPlaceService,
    private tokenStorageService: TokenStorageService,
    private snackbar: SnackbarService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.rowData = this.data.rowData;
    console.log('Row Data:', this.rowData);
  }

  public onDelete() {
    this.rowData = this.data.rowData;
    console.log('Row Data:', this.rowData);
    const data = this.tokenStorageService.getUser();
    const accessToken = data.access_token;
    this.marketPlaceService.deleteProductCategory(this.rowData.id, accessToken).subscribe({
      next: ((res) => {
        if (res.statusCode === 204) {
          this.dialogRef.close();
          this.snackbar.showNotification("snackbar-message", "Product category deleted successifully");
          this.dataService.updateData();
        }
        else {
          this.snackbar.showNotification("snackbar-warn", res.message);
        }
      }),
      error: ((error) => {
        this.snackbar.showNotification("snackbar-warn", error);
      }),
      complete: (() => { })
    })
  }

  public onCancel() {
    this.dialogRef.close();
  }
}


