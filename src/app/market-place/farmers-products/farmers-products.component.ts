import { Component, OnInit, ViewChild } from '@angular/core';
import { SnackbarService } from 'src/app/admin/services/snackbar.service';
import { MarketPlaceService } from '../services/market-place.service';
import { HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewProductDetailsComponent } from '../view-product-details/view-product-details.component';

@Component({
  selector: 'app-farmers-products',
  templateUrl: './farmers-products.component.html',
  styleUrls: ['./farmers-products.component.css']
})

export class FarmersProductsComponent implements OnInit {

  farmProducts: any[] = [];
  filteredFarmProducts: any[] = [];
  productImage: any;
  file: any;
  isLoading = true;
  event: Event;
  selectedValue: string;
  isVerified: any;

  verified: boolean = true;
  onStock: boolean = true;
  sellingPoint: string = "MARKETPLACE";

  status: string[] = ['Verified', 'Unverified'];
  availability: string[] = ['On stock', "Out of stock"];
  market: string[] = ['Market', 'Warehouse'];

  constructor(
    private marketService: MarketPlaceService,
    private snackbar: SnackbarService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFarmProducts();
  }

  public selectVerified(event: any) {
    console.log("Event", event.value);
    if (event.value === "Verified") {
      this.verified = true;
      this.farmProducts.pop();
      this.getFarmProducts();
    }
    if (event.value === "Unverified") {
      this.verified = false;
      this.farmProducts.pop();
      this.getFarmProducts();
    }
  }

  public selectOnstock(event: any) {
    console.log("Event", event.value);
    if (event.value === "On stock") {
      this.onStock = true;
      this.farmProducts.pop();
      this.getFarmProducts();
    }
    if (event.value === "Out of stock") {
      this.onStock = false;
      this.farmProducts.pop();
      this.getFarmProducts();
    }
  }

  public selectSellingPoint(event: any) {
    console.log("Event", event.value);
    if (event.value === "Market") {
      this.sellingPoint = "MARKETPLACE";
      this.farmProducts.pop();
      this.getFarmProducts();
    }
    if (event.value === "Warehouse") {
      this.sellingPoint = "WAREHOUSE";
      this.farmProducts.pop();
      this.getFarmProducts();
    }
  }

  public getFarmProducts() {

    this.isLoading = true;

    let params = new HttpParams();

    if (this.verified !== null) {
      params = params.set('verified', this.verified.toString());
    }

    if (this.onStock !== null) {
      params = params.set('onStock', this.onStock.toString());
    }

    if (this.sellingPoint !== null) {
      params = params.set('sellingPoint', this.sellingPoint);
    }

    console.log("Params", params);

    this.farmProducts.pop();
    this.marketService.getFarmProduct(params).subscribe({
      next: ((res) => {
        if (res.statusCode == 200) {

          this.farmProducts = res.entity;
          for (const farmProduct of this.farmProducts) {
            this.isVerified = farmProduct.isVerified;
         }
         console.log("Status", this.isVerified);
          console.log("Products", this.farmProducts);

          if (this.farmProducts) {
            this.isLoading = false
          }
          this.productImage = res.entity.productImage;
          this.file = this.base64StringToDataUrl(this.productImage, 'image/png');
          console.log("Image", this.file);
        } else {
          console.log("Missing", res.message)
          this.isLoading = false;
        }
      }),
      error: ((error) => {
        this.snackbar.showNotification("snackbar-warn", error);
      }),
      complete: (() => { })
    })
  }

  private base64StringToDataUrl(base64String: string, mimeType: string): string {
    return `data:${mimeType};base64,${base64String}`;
  }

  // public verify(){

  // }

  public openViewProductDialog(row: any){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '600px'
    dialogConfig.data = { rowData: row }

    const dialogRef = this.dialog.open(ViewProductDetailsComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });
  }
}