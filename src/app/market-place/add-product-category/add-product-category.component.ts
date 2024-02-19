import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarketPlaceService } from '../services/market-place.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ProductCategoriesComponent } from '../product-categories/product-categories.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.sass']
})
export class AddProductCategoryComponent implements OnInit {

  constructor(
    private tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<ProductCategoriesComponent>,
    private formBuilder: FormBuilder,
    private marketService: MarketPlaceService,
    private snackbar: SnackbarService,
    private dataService: DataService) { }

  ngOnInit(): void {
  }

  prodForm: FormGroup = this.formBuilder.group({
    productCategory: ["", Validators.required],
    description: ["", Validators.required]
  });

  submit() {

    const data = this.tokenStorage.getUser();
    let access_token = data.access_token;
    console.log("Access token", access_token);

    const prodData = {
      productCategory: this.prodForm.value.productCategory,
      description: this.prodForm.value.description
    };
    this.marketService.addProductCategory(prodData, access_token).subscribe({
      next: ((res) => {
        if (res.statusCode == 201) {
          this.dialogRef.close();
          this.snackbar.showNotification("snackbar-message", "Product category added successfully");
          this.dataService.updateData();
        } else {
          this.snackbar.showNotification("snackbar-warn", res.message)
        }
      }),
      error: ((error) => {
        this.snackbar.showNotification("snackbar-warn", error);
      }),
      complete: (() => { })
    })
  }
  onClick() {
    this.dialogRef.close();
  }

}
