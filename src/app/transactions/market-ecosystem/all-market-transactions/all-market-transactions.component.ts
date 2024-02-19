import { Component, OnInit, ViewChild } from '@angular/core';
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
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, catchError, of, forkJoin, finalize, Observable } from 'rxjs';
import { AdminService } from 'src/app/admin/services/admin.service';

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
  selector: 'app-all-market-transactions',
  templateUrl: './all-market-transactions.component.html',
  styleUrls: ['./all-market-transactions.component.css']
})
export class AllMarketTransactionsComponent implements OnInit {

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
    { name: "November", value: '11' },
    { name: "December", value: '12' },
  ];
  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];
  monthlyStr = formatDate(Date.now(), 'MONTH', 'en-US');
  allTransactions: any[] = [];
  valueChainCounts: Map<string, number> = new Map();

  allUsers: any;
  allTransactionsWithRoles: TransactionWithRoles[];
  chartData: any;

  constructor(
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService,
    private transactionService: TransactionsService,
    private adminService: AdminService
  ) {
    this.chartOptions = {
      series: [
        {
          name: "Customers to farmers",
          data: []
        },
        {
          name: "Customers to drivers",
          data: []
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
        categories: []
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + ": Ksh.";
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + ": Ksh.";
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + ": Ksh.";
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

  form: FormGroup = this.formBuilder.group({
    year: [''],
    month: [''],
  })

  ngOnInit(): void {
    this.getAllUsersAndTransactions();
    this.form = this.createChartParamtersForm();
  }

  private getAllUsersAndTransactions() {
    const userData = this.tokenStorage.getUser();
    const access_token = userData.access_token;

    forkJoin([
      this.adminService.getAllUsers(access_token),
      this.transactionService.getAllTransactions(access_token)
    ]).subscribe({
      next: ([usersResponse, transactionsResponse]) => {
        if (usersResponse.statusCode === 200) {
          this.allUsers = usersResponse.entity;
          console.log("All users", this.allUsers);
        } else {
          console.log("Info", usersResponse.message);
        }
        if (transactionsResponse.statusCode === 200) {
          this.allTransactions = transactionsResponse.entity;
          console.log("Transactions", this.allTransactions);
          this.matchUsersAndAddRoles();
        } else {
          console.log("Info", transactionsResponse.message);
        }
      },
      error: (error) => {
        console.error("Error fetching data", error);
      },
    });
  }

  private matchUsersAndAddRoles() {
    const transactionsWithRoles = [];
    for (const transaction of this.allTransactions) {
      const buyerUser = this.findUserById(transaction.buyerUserId);
      const sellerUser = this.findUserById(transaction.sellerUserId);
      const transactionWithRoles = { ...transaction };
      if (buyerUser) {
        transactionWithRoles.buyerUserRole = buyerUser.role;
      }
      if (sellerUser) {
        transactionWithRoles.sellerUserRole = sellerUser.role;
      }
      transactionsWithRoles.push(transactionWithRoles);
    }
    this.allTransactionsWithRoles = transactionsWithRoles;
    console.log("Transactions with roles", this.allTransactionsWithRoles)
    this.prepareChartData();
    this.chartOptions.series = [
      {
        name: "Customers to Farmer",
        data: this.chartData.customerToFarmer,
      },
      {
        name: "Farmers to Farmers",
        data: this.chartData.farmerToFarmer,
      }
    ];
    if (this.chart) {
      this.chart.updateOptions(this.chartOptions);
    }

  }

  private findUserById(userId: number) {
    return this.allUsers.find(user => user.id === userId);
  }

  // private prepareChartData() {
  //   this.chartData = {
  //     categories: [] as string[],
  //     customerToFarmer: [] as number[],
  //     farmerToFarmer: [] as number[],
  //   };

  //   const groupedData: { [key: string]: { roles: string; date: string; amount: number } } = {};

  //   this.allTransactionsWithRoles.forEach((transaction) => {
  //     // Extract the date part from the timestamp
  //     const transactionDate = new Date(transaction.timeStamp);
  //     const formattedDate = transactionDate.toISOString().split('T')[0];
  //     // const key = `${transaction.buyerUserRole}-${transaction.sellerUserRole}-${formattedDate}`;
  //     const key = `${transaction.buyerUserRole}-${transaction.sellerUserRole}`;

  //     if (!groupedData[key]) {
  //       groupedData[key] = { roles: key, date: formattedDate, amount: 0 };
  //       this.chartData.categories.push(formattedDate); // Add the date to categories only once
  //     }

  //     groupedData[key].amount += transaction.totalAmount;
  //     console.log("Grouped data", groupedData)

  //     if (transaction.buyerUserRole === 'CUSTOMER' && transaction.sellerUserRole === 'FARMER') {
  //       this.chartData.customerToFarmer.push(groupedData[key].amount);
  //     } else if (transaction.buyerUserRole === 'FARMER' && transaction.sellerUserRole === 'FARMER') {
  //       this.chartData.farmerToFarmer.push(groupedData[key].amount);
  //     }
  //   });
  // }

  private prepareChartData() {
    this.chartData = {
      categories: [] as string[],
      customerToFarmer: [] as number[],
      farmerToFarmer: [] as number[],
    };

    const groupedData: Map<string, number> = new Map();

    this.allTransactionsWithRoles.forEach((transaction) => {
      // Extract the date part from the timestamp
      const transactionDate = new Date(transaction.timeStamp);
      const formattedDate = transactionDate.toISOString().split('T')[0];
      const key = `${transaction.buyerUserRole}-${transaction.sellerUserRole}-${formattedDate}`;

      if (!groupedData.has(key)) {
        groupedData.set(key, 0);
        this.chartData.categories.push(formattedDate); // Add the date to categories only once
      }

      groupedData.set(key, groupedData.get(key)! + transaction.totalAmount);
      console.log("grouped data", groupedData);

      if (transaction.buyerUserRole === 'CUSTOMER' && transaction.sellerUserRole === 'FARMER') {
        this.chartData.customerToFarmer.push(groupedData.get(key)!);
      } else if (transaction.buyerUserRole === 'FARMER' && transaction.sellerUserRole === 'FARMER') {
        this.chartData.farmerToFarmer.push(groupedData.get(key)!);
      }
    });
  }  

  // private prepareChartData() {
  //   const transactionDetails: {
  //     id: number;
  //     roles: string;
  //     timeStamp: string;
  //     amount: number;
  //   }[] = [];
  //   const summedAmounts: {
  //     roles: string;
  //     timeStamp: string;
  //     totalAmount: number;
  //   }[] = [];

  //   this.allTransactionsWithRoles.forEach((transaction) => {
  //     const transactionDate = new Date(transaction.timeStamp);
  //     const formattedDate = transactionDate.toISOString().split('T')[0];
  //     const key = `${transaction.buyerUserRole}-${transaction.sellerUserRole}-${formattedDate}`;
  //     const amount = transaction.totalAmount;

  //     // Create the transaction detail object
  //     transactionDetails.push({
  //       id: transaction.id,
  //       roles: key,
  //       timeStamp: formattedDate,
  //       amount: amount,
  //     });

  //     // Update or add to the summed amounts object
  //     const summedTransaction = summedAmounts.find((item) => item.roles === key && item.timeStamp === formattedDate);
  //     if (summedTransaction) {
  //       summedTransaction.totalAmount += amount;
  //     } else {
  //       summedAmounts.push({
  //         roles: key,
  //         timeStamp: formattedDate,
  //         totalAmount: amount,
  //       });
  //     }
  //   });

  //   console.log("Transaction Details", transactionDetails);
  //   console.log("Summed Amounts", summedAmounts);
  //   this.updateChartData(summedAmounts);
  // }

  public onSelectYear(event: any) {
    const selectedYear = this.form.get('year')?.value;
    const transactionsForSelectedYear = this.allTransactionsWithRoles.filter(transaction => {
      const transactionYear = new Date(transaction.timeStamp).getFullYear();
      return transactionYear === selectedYear;
    });
    this.updateChartData(transactionsForSelectedYear);
  }

  public onSelectMonth(event: any) {
    const selectedYear = this.form.get('year')?.value;
    const selectedMonth = this.form.get('month')?.value;
    // Filter transactions based on the selected year and month
    const transactionsForSelectedMonth = this.allTransactionsWithRoles.filter(transaction => {
      const transactionYear = new Date(transaction.timeStamp).getFullYear();
      const transactionMonth = new Date(transaction.timeStamp).getMonth() + 1; // Months are 0-indexed
      return transactionYear === selectedYear && transactionMonth.toString() === selectedMonth;
    });

    console.log("Month's transactions", transactionsForSelectedMonth);
    this.updateChartData(transactionsForSelectedMonth);
  }

  private updateChartData(transactions: TransactionWithRoles[]) {
    this.chartData = {
      categories: [] as string[],
      customerToFarmer: [] as number[],
      farmerToFarmer: [] as number[]
    };

    // Populate chartData arrays from the filtered transactions
    transactions.forEach((transaction) => {
      this.chartData.categories.push(transaction.timeStamp);
      console.log("Date on update", this.chartData.categories);
      if (transaction.buyerUserRole === 'CUSTOMER' && transaction.sellerUserRole === 'FARMER') {
        this.chartData.customerToFarmer.push(transaction.totalAmount);
      } else if (transaction.buyerUserRole === 'FARMER' && transaction.sellerUserRole === 'FARMER') {
        this.chartData.farmerToFarmer.push(transaction.totalAmount);
      }
    });

    // Update the chart options
    this.chartOptions.series = [
      {
        name: "Customers to Farmer",
        data: this.chartData.customerToFarmer,
      },
      {
        name: "Farmers to Farmers",
        data: this.chartData.farmerToFarmer,
      }
    ];

    this.chartOptions.xaxis.categories = this.chartData.categories;

    if (this.chart) {
      this.chart.updateOptions(this.chartOptions);
    }
  }

  private createChartParamtersForm() {
    return this.formBuilder.group({
      year: [this.currentYear],
      month: [this.currentMonth.value]
    });
  }

}

interface TransactionWithRoles {
  id: number;
  orderItemName: string;
  totalAmount: number;
  transactionId: string;
  buyerUserId: number;
  sellerUserId: number;
  sellerName: string;
  buyerName: string;
  timeStamp: string;
  transStatus: string;
  tempPartTrans: TempPartTransaction[];
  buyerUserRole?: string; // Optional property
  sellerUserRole?: string; // Optional property
}

interface TempPartTransaction {
  id: number;
  drAcc: string;
  crAcc: string;
  amount: number;
  partTransTypes: string;
}