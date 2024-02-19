import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agrodealer-products',
  templateUrl: './agrodealer-products.component.html',
  styleUrls: ['./agrodealer-products.component.css']
})
export class AgrodealerProductsComponent implements OnInit {

  agrodealerProducts: any[] = [];

  verified: boolean = true;
  onStock: boolean = true;
  sellingPoint: string = "MARKETPLACE";

  status: string[] = ['Verified', 'Unverified'];
  availability: string[] = ['In stock', "Out of stock"];
  market: string[] = ['Market', 'Warehouse'];

  constructor() { }

  ngOnInit(): void {
  }

  public selectVerified(event: any) {
    console.log("Event", event.value);
    if (event.value === "Verified") {
      this.verified = true;
      this.agrodealerProducts.pop();
      this.getAgrodealerProducts();
    }
    if (event.value === "Unverified") {
      this.verified = false;
      this.agrodealerProducts.pop();
      this.getAgrodealerProducts();
    }
  }

  public selectOnstock(event: any) {
    console.log("Event", event.value);
    if (event.value === "On stock") {
      this.onStock = true;
      this.agrodealerProducts.pop();
      this.getAgrodealerProducts();
    }
    if (event.value === "Out of stock") {
      this.onStock = false;
      this.agrodealerProducts.pop();
      this.getAgrodealerProducts();
    }
  }

  public selectSellingPoint(event: any) {
    console.log("Event", event.value);
    if (event.value === "Market") {
      this.sellingPoint = "MARKETPLACE";
      this.agrodealerProducts.pop();
      this.getAgrodealerProducts();
    }
    if (event.value === "Warehouse") {
      this.sellingPoint = "WAREHOUSE";
      this.agrodealerProducts.pop();
      this.getAgrodealerProducts();
    }
  }

  private getAgrodealerProducts(){
    
  }

}
