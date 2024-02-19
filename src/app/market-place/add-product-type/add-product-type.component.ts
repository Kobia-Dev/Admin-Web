import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeOfProductTableComponent } from '../type-of-product-table/type-of-product-table.component';
import { MarketPlaceService } from '../services/market-place.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.sass']
})
export class AddProductTypeComponent implements OnInit {

  productCategory: any;

  constructor(
    public dialogRef: MatDialogRef<TypeOfProductTableComponent>,
    private marketService: MarketPlaceService,
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService,
    private snackbar: SnackbarService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  typeForm: FormGroup = this.formBuilder.group({
    typeOfProduct: ["", Validators.required],
    description: ["", Validators.required],
    units: ["", Validators.required],
    categoryId: ["", Validators.required],
  });

  public getCategories(){
    this.marketService.getProductCategories().subscribe({
      next: ((res) => {
        if (res.statusCode == 200){
          this.productCategory = res.entity;
        }
        console.log("Categories", this.productCategory)
      }),
      error: ((error) => {
        console.log("Error fetching products", error);
      }),
      complete: (() =>{})
    })
  }
  submit(){ 
    const data = this.tokenStorage.getUser();
    let access_token = data.access_token;
    const load = {
      typeOfProduct: this.typeForm.value.typeOfProduct,
      description: this.typeForm.value.description,
      units: this.typeForm.value.units,
      categoryId: this.typeForm.value.categoryId,
    };
    this.marketService.addProductType(load, access_token).subscribe({
      next: ((res) => {
        if (res.statusCode == 201){
          this.dialogRef.close();
          this.snackbar.showNotification("snackbar-message", "Product added successfully");
          this.dataService.updateData();
        }else{
          this.snackbar.showNotification("snackbar-warn", res.message);
        }
      }),
      error: ((error) => {
        this.snackbar.showNotification("snackbar-warn", error);
      }),
      complete: (() => {})
    })
  }
  onClick(){
    this.dialogRef.close();
  }
}
