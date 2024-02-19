import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FarmerService } from 'src/app/admin/services/farmer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerService } from 'src/app/admin/services/customer.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})


export class ViewComponent extends BaseComponent implements OnInit {

  customers: any;
  isLoading: boolean = true;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['firstName', 'id', 'phoneNo', 'latitude', 'longitude', 'email', 'actions'];

  constructor(
    private customerService: CustomerService) {
    super();
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  public getCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: ((res) => {
        this.customers = res.entity;
        console.log("Customers list", this.customers);
        if (this.customers) {
          this.isLoading = false;
        }
        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }),
      error: ((error) => {

      }),
      complete: (() => { })
    })
  }
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public addCustomers() {

  }
  public refresh() {
    this.getCustomers();
  }
}
