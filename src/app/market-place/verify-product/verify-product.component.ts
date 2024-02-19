import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FarmersProductsComponent } from '../farmers-products/farmers-products.component';

@Component({
  selector: 'app-verify-product',
  templateUrl: './verify-product.component.html',
  styleUrls: ['./verify-product.component.css']
})
export class VerifyProductComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FarmersProductsComponent>) { }

  ngOnInit(): void {
  }

}
