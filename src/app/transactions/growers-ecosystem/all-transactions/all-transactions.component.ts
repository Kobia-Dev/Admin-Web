import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ChartComponent,
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
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { TransactionsService } from '../../services/transactions.service';

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
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css']
})
export class AllTransactionsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  chartDispType: any = [2022, 2023, 2024, 2025, 2026];
  monthsArray: any = [
    { name: "January", value: '01' },
    { name: "February", value: '02' },
    { name: "March", value: '03' },
    { name: "April", value: '04' },
    { name: "May", value: '05' },
    { name: "June", value: '06' },
    { name: "July", value: '07' },
    { name: "August", value: '08' },
    { name: "September", value: '09' },
    { name: "October", value: '10' },
    { name: "Novembar", value: '11' },
    { name: "December", value: '12' },
  ];
  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];
  monthlyStr = formatDate(Date.now(), 'MONTH', 'en-US');
  allTransactions: any[] = [];
  valueChainCounts: Map<string, number> = new Map();

  buyerUserId: any;
  sellerUserId: any;

  constructor(
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService,
    private transactionService: TransactionsService) { }

  form: FormGroup = this.formBuilder.group({
    year: [''],
    month: [''],
  })

  ngOnInit(): void {
    this.getTransactions();
    this.form = this.createChartParamtersForm();
  }

  private getTransactions() {
    const data = this.tokenStorage.getUser();
    let access_token = data.access_token;
    this.transactionService.getAllTransactions(access_token).subscribe({
      next: ((res) => {
        if (res.statusCode === 200) {
          this.allTransactions = res.entity;
          const transactionsWithRoles = [];
          
          this.allTransactions.forEach((transaction) => {
            if (transaction.buyerUserId) {
              this.getUserRole(transaction.buyerUserId, (buyerRole) => {
                transactionsWithRoles.push({ ...transaction, buyerRole });
                if (transactionsWithRoles.length === this.allTransactions.length) {
                  // All roles fetched, proceed to render the chart
                  // this.prepareChartData(transactionsWithRoles);
                }
              });
            }
            if (transaction.sellerUserId) {
              this.getUserRole(transaction.sellerUserId, (sellerRole) => {
                transactionsWithRoles.push({ ...transaction, sellerRole });
                if (transactionsWithRoles.length === this.allTransactions.length) {
                  // All roles fetched, proceed to render the chart
                  // this.prepareChartData(transactionsWithRoles);
                }
              });
            }
          });

          this.renderChart();
        } else {
          console.log("Info", res.message);
        }
      }),
      error: ((error) => {
        console.log("No data available", error);
      }),
      complete: (() => { })
    })
    this.renderChart();
  }

  private getUserRole(userId: any, callback: (role: string) => void) {
    const data = this.tokenStorage.getUser();
    const token = data.access_token;
    this.transactionService.getUser(userId, token).subscribe({
      next: (res) => {
        
        if (res.entity && res.entity.role) {
          const role = res.entity.role;
          callback(role);
        } else {
          callback('Role not found');
        }
      },
      error: (error) => {
        console.log("Error fetching user role", error);
      },
      complete: () => { }
    });
  }

  public onSelectYear(event: any) {

  }

  public onSelectMonth(event: any) {

  }

  private createChartParamtersForm() {
    return this.formBuilder.group({
      year: [this.currentYear],
      month: [this.currentMonth.value]
    });
  }

  private renderChart() {
    const valueChainNames = Array.from(this.valueChainCounts.keys());
    const valueChainCountsArray = Array.from(this.valueChainCounts.values());
    this.chartOptions = {
      series: [
        {
          name: "Farmers to agrrodealers",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "Farmers to drivers",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
          name: "Farmers to service providers",
          data: [81, 52, 79, 90, 73, 35, 69, 45, 83, 58, 49, 42]
        },
        {
          name: "Customers to drivers",
          data: [83, 67, 54, 19, 65, 28, 92, 37, 92, 46, 45, 17]
        },
        {
          name: "Customers to farmers",
          data: [117, 107, 134, 149, 155, 138, 162, 147, 282, 156, 145, 147]
        }
      ],
      chart: {
        height: 400,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      // title: {
      //   text: "Page Statistics",
      //   align: "left"
      // },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
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
          "01 Jan",
          "02 Jan",
          "03 Jan",
          "04 Jan",
          "05 Jan",
          "06 Jan",
          "07 Jan",
          "08 Jan",
          "09 Jan",
          "10 Jan",
          "11 Jan",
          "12 Jan"
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " (mins)";
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + " per session";
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val;
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
}
