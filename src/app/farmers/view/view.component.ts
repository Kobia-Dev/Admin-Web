import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FarmerService } from 'src/app/admin/services/farmer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent extends BaseComponent implements OnInit {

  farmers: any;
  isLoading = true;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['farmerCode', 'firstName', 'id', 'phoneNo', 'email', 'latitude', 'longitude', 'actions'];

  constructor(
    private farmerService: FarmerService) {
    super();
  }

  ngOnInit(): void {
    this.getFarmers();
  }

  public getFarmers() {
    this.farmerService.getAllFarmers().subscribe({
      next: ((res) => {
        this.farmers = res.entity;
        // console.log("farmers list", this.farmers);
        if (this.farmers) {
          this.isLoading = false;
        }
        this.dataSource = new MatTableDataSource(this.farmers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }),
      error: ((error) => {
        // this.isLoading = false;
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

  public addFarmer() {

  }
  public refresh() {
    this.getFarmers();
  }
}
