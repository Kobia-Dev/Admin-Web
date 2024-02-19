import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from '../../services/transactions.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  loading = false;
  error = "";
  order: any[] = [];
  orderCount: number = 0;
  ordersFetched: boolean = false;
  order2: any;
  anotherJson: any;
  person: any;
  status: any = ""

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionsService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    // this.submit();
  }

  searchForm: FormGroup = this.formBuilder.group({
    transactionId: ["", Validators.required],
    product: ["", Validators.required],
  });
  

 onSubmit(){
    if (this.searchForm.value.product === "FARMRODUCTS"){
      this.transactionService.getOrderById(this.searchForm.value.transactionId).subscribe({
        next: ((res) => {
          if (res.statusCode === 200){
            this.order = res.entity;
            this.status = res.entity.orderStatus;

            this.anotherJson = res.entity.orderItems.map( (item: any)=>{
                this.person = item.user;
                console.log("Each item",item.user);
                }
            );

            this.ordersFetched = true;
            console.log("Order", this.order);
            this.loading = false;
          }else{
            this.error = "Invalid transaction Id"
            console.log(this.error )
            this.loading = false;
          }
        }),
        error: ((error) => {
          console.log("Error", error);
          this.loading = false;
        }),
        complete: (() => {})
      })
    }
  }

  public completeTransaction(){
    const data = this.tokenStorage.getUser();
    let access_token = data.access_token;
    this.transactionService.completeTransaction(this.searchForm.value.transactionId).subscribe({
      next: ((res) => {
        if (res.statusCode === 200){

        }else {
          
        }
      }),
      error: ((error) => {

      }),
      complete: (() => {})
    })
  }

}
