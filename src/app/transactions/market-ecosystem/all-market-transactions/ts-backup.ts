// import { Component, OnInit, ViewChild } from '@angular/core';
// import {
//   ChartComponent,
//   ApexAxisChartSeries,
//   ApexChart,
//   ApexXAxis,
//   ApexDataLabels,
//   ApexStroke,
//   ApexMarkers,
//   ApexYAxis,
//   ApexGrid,
//   ApexTitleSubtitle,
//   ApexLegend
// } from 'ng-apexcharts';
// import { TokenStorageService } from 'src/app/core/service/token-storage.service';
// import { TransactionsService } from '../../services/transactions.service';
// import { formatDate } from '@angular/common';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { forkJoin } from 'rxjs';
// import { AdminService } from 'src/app/admin/services/admin.service';

// interface TransactionWithRoles {
//   id: number;
//   orderItemName: string;
//   totalAmount: number;
//   transactionId: string;
//   buyerUserId: number;
//   sellerUserId: number;
//   sellerName: string;
//   buyerName: string;
//   timeStamp: string;
//   transStatus: string;
//   tempPartTrans: TempPartTransaction[];
//   buyerUserRole?: string;
//   sellerUserRole?: string;
// }

// interface TempPartTransaction {
//   id: number;
//   drAcc: string;
//   crAcc: string;
//   amount: number;
//   partTransTypes: string;
// }

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   stroke: ApexStroke;
//   dataLabels: ApexDataLabels;
//   markers: ApexMarkers;
//   tooltip: any;
//   yaxis: ApexYAxis;
//   grid: ApexGrid;
//   colors: string[];
//   legend: ApexLegend;
//   title: ApexTitleSubtitle;
// };

// @Component({
//   selector: 'app-all-market-transactions',
//   templateUrl: './all-market-transactions.component.html',
//   styleUrls: ['./all-market-transactions.component.css']
// })
// export class AllMarketTransactionsComponent implements OnInit {
//   @ViewChild('chart') chart: ChartComponent;
//   public chartOptions: Partial<ChartOptions>;

//   form: FormGroup;

//   chartData: {
//     categories: string[];
//     customerToFarmer: number[];
//     farmerToFarmer: number[];
//   } = {
//       categories: [],
//       customerToFarmer: [],
//       farmerToFarmer: [],
//     };

//   constructor(
//     private formBuilder: FormBuilder,
//     private tokenStorage: TokenStorageService,
//     private transactionService: TransactionsService,
//     private adminService: AdminService
//   ) {
//     this.chartOptions = {
//       series: [
//         {
//           name: 'Customers to farmers',
//           data: this.chartData.customerToFarmer,
//         },
//         {
//           name: 'Customers to drivers',
//           data: this.chartData.farmerToFarmer,
//         },
//       ],
//       chart: {
//         height: 400,
//         type: 'line',
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         width: 5,
//         curve: 'straight',
//         dashArray: [0, 8, 5],
//       },
//       legend: {
//         tooltipHoverFormatter: function (val, opts) {
//           return (
//             val +
//             ' - <strong>' +
//             opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
//             '</strong>'
//           );
//         },
//       },
//       markers: {
//         size: 0,
//         hover: {
//           sizeOffset: 6,
//         },
//       },
//       xaxis: {
//         labels: {
//           trim: false,
//         },
//         categories: this.chartData.categories,
//       },
//       tooltip: {
//         y: [
//           {
//             title: {
//               formatter: function (val) {
//                 return val + ': Ksh.';
//               },
//             },
//           },
//           {
//             title: {
//               formatter: function (val) {
//                 return val + ': Ksh.';
//               },
//             },
//           },
//           {
//             title: {
//               formatter: function (val) {
//                 return val + ': Ksh.';
//               },
//             },
//           },
//         ],
//       },
//       grid: {
//         borderColor: '#f1f1f1',
//       },
//     };
//     this.form = this.createChartParametersForm();
//   }

//   ngOnInit(): void {
//     this.getAllUsersAndTransactions();
//   }

//   private createChartParametersForm(): FormGroup {
//     const currentYear = new Date().getFullYear();
//     const currentMonth = formatDate(Date.now(), 'MM', 'en-US');

//     return this.formBuilder.group({
//       year: [currentYear],
//       month: [currentMonth],
//     });
//   }

//   private getAllUsersAndTransactions() {
//     const userData = this.tokenStorage.getUser();
//     const access_token = userData.access_token;

//     forkJoin([
//       this.adminService.getAllUsers(access_token),
//       this.transactionService.getAllTransactions(access_token),
//     ]).subscribe({
//       next: ([usersResponse, transactionsResponse]) => {
//         if (usersResponse.statusCode === 200) {
//           const allUsers = usersResponse.entity;
//           console.log('All users', allUsers);
//         } else {
//           console.log('Info', usersResponse.message);
//         }

//         if (transactionsResponse.statusCode === 200) {
//           this.handleTransactionData(transactionsResponse.entity);
//         } else {
//           console.log('Info', transactionsResponse.message);
//         }
//       },
//       error: (error) => {
//         console.error('Error fetching data', error);
//       },
//     });
//   }

//   private handleTransactionData(allTransactions: TransactionWithRoles[]) {
//     // Prepare the chart data
//     const { chartData } = this;

//     allTransactions.forEach((transaction) => {
//       const transactionDate = new Date(transaction.timeStamp);
//       const formattedDate = transactionDate.toISOString().split('T')[0];
//       const key = `${transaction.buyerUserRole}-${transaction.sellerUserRole}-${formattedDate}`;
//       const amount = transaction.totalAmount;

//       if (!chartData.categories.includes(formattedDate)) {
//         chartData.categories.push(formattedDate);
//       }

//       if (transaction.buyerUserRole === 'CUSTOMER' && transaction.sellerUserRole === 'FARMER') {
//         chartData.customerToFarmer.push(amount);
//       } else if (transaction.buyerUserRole === 'FARMER' && transaction.sellerUserRole === 'FARMER') {
//         chartData.farmerToFarmer.push(amount);
//       }
//     });

//     // Update the chart
//     this.updateChartOptions(chartData);
//   }

//   private updateChartOptions(chartData: typeof AllMarketTransactionsComponent.prototype.chartData) {
//     this.chartOptions.series = [
//       {
//         name: 'Customers to Farmer',
//         data: chartData.customerToFarmer,
//       },
//       {
//         name: 'Farmers to Farmers',
//         data: chartData.farmerToFarmer,
//       },
//     ];

//     this.chartOptions.xaxis.categories = chartData.categories;

//     if (this.chart) {
//       this.chart.updateOptions(this.chartOptions);
//     }
//   }

//   public onSelectYear(event: any) {
//     const selectedYear = this.form.get('year')?.value;
//     const transactionsForSelectedYear = this.allTransactionsWithRoles.filter((transaction) => {
//       const transactionYear = new Date(transaction.timeStamp).getFullYear();
//       return transactionYear === selectedYear;
//     });
//     this.handleTransactionData(transactionsForSelectedYear);
//   }

//   public onSelectMonth(event: any) {
//     const selectedYear = this.form.get('year')?.value;
//     const selectedMonth = this.form.get('month')?.value;
//     // Filter transactions based on the selected year and month
//     const transactionsForSelectedMonth = this.allTransactionsWithRoles.filter((transaction) => {
//       const transactionYear = new Date(transaction.timeStamp).getFullYear();
//       const transactionMonth = new Date(transaction.timeStamp).getMonth() + 1; // Months are 0-indexed
//       return transactionYear === selectedYear && transactionMonth.toString() === selectedMonth;
//     });

//     this.handleTransactionData(transactionsForSelectedMonth);
//   }

// }