import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartComponent } from 'ng-apexcharts';
import { Subject } from 'rxjs';
import { AgribusinessService } from 'src/app/admin/services/agribusiness.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
import { ViewAgribusinessComponent } from '../view-agribusiness/view-agribusiness.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteAgribusinessComponent } from '../delete-agribusiness/delete-agribusiness.component';
import { DataService } from 'src/app/market-place/services/data.service';
import {AgrodealerDistributionComponent} from  '../agrodealer-distribution/agrodealer-distribution.component';
import { DeactivateAgribusinessComponent } from '../deactivate-agribusiness/deactivate-agribusiness.component';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-agri-business',
  templateUrl: './agri-business.component.html',
  styleUrls: ['./agri-business.component.css']
})
export class AgriBusinessComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['no', 'fullName', 'email', 'phoneNo', 'status' , 'actions']; 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  currentPage = 1;
  AgribusinessPerPage = 10;
  destroy$: Subject<boolean> = new Subject<boolean>();
  agribusiness_entity: any;
  agribusiness_user: any;
  isLoading = true;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions1: Partial<ChartOptions>;



  constructor(private agriService: AgribusinessService, private dialog: MatDialog, private dataService: DataService,) {
    this.chartOptions1 = {
      series: [
        {
          name: "Fertilisers",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "Dairy Feeds",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
          name: "medical",
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }
      ],
      chart: {
        width: 450,
        height: 500,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      title: {
        text: "Total Sales",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec"
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val) {
                return val + " Kshs";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val + " Kshs";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val + " Kshs";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val + " Kshs";
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };
   }
   ngOnInit(): void {
    this.loadAgribusiness();
    this.dataService.getUpdateData().subscribe(() => {
      this.loadAgribusiness();
    }
    );
  
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public refresh(){
    this.loadAgribusiness();
  }
  
  public loadAgribusiness() {
    this.agriService.getAllAgribusiness().subscribe({
      next: ((res) => {
        console.log("Agribusiness: ", res.entity);
        this.agribusiness_entity = res.entity;
        this.agribusiness_user = res.entity.user;
        this.dataSource = new MatTableDataSource(this.agribusiness_entity);      
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      }),

      error: ((error) => {
        console.log("error fetching agribusiness: ", error);
      }),
      complete: (() => {
        console.log("success fetching agribusiness: ", );
      })
  });
  }
  public applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  public viewRecord(row : any){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '600px'
    dialogConfig.data = { rowData: row }

    const dialogRef = this.dialog.open(ViewAgribusinessComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });
  }
 
  public deleteRecord(row : any){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '600px'
    dialogConfig.data = { rowData: row }

    const dialogRef = this.dialog.open(DeleteAgribusinessComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });    
  }

  public deactivateRecord(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = { rowData: row };
  
    const dialogRef = this.dialog.open(DeactivateAgribusinessComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
      // Add logic here to handle the result if needed
      if (result === 'deactivateConfirmed') {
        // Implement the logic to deactivate the agribusiness record here
        console.log('Deactivating record:', row);
        // Call the service method to deactivate the record
        // this.agriService.deactivateAgribusiness(row.id).subscribe(...);
        // Reload the agribusiness data
        this.loadAgribusiness();
      }
    });
  }
  
  }
