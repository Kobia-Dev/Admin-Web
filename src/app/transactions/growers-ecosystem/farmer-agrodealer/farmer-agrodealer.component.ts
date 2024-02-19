import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from 'src/app/core/service/utils';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import { TransactionsService } from '../../services/transactions.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-farmer-agrodealer',
  templateUrl: './farmer-agrodealer.component.html',
  styleUrls: ['./farmer-agrodealer.component.css']
})
export class FarmerAgrodealerComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  chartDispType: any = [2022, 2023, 2024, 2025, 2026];
  monthsArray: any = [
    { name: "January", value: '01' },
    { name: "February", value : '02' },
    { name: "March", value: '03'},
    { name: "April", value: '04' },
    { name: "May", value: '05' },
    { name: "June", value: '06' },
    { name: "July", value: '07' },
    { name: "August", value: '08' },
    { name: "September", value: '09' },
    { name: "October", value: '10' },
    { name: "Novembar", value: '11'  },
    { name: "December", value: '12' },
  ];
  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];
  monthlyStr = formatDate(Date.now(),'MONTH')
  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionsService,
    private tokenStorage: TokenStorageService) { }

  form: FormGroup = this.formBuilder.group({
    year: [''],
    month: [''],
  })
  
  ngOnInit(): void {
    this.getTransactions();
    this.form = this.createChartParamtersForm();
  }

  private getTransactions(){
    this.renderChart();
    const data = this.tokenStorage.getUser();
    const token = data.access_token;
    this.transactionService.getAllTransactions(token).subscribe({
      next: ((res) => {
        console.log("transactions", res.entity);
      })
    })
  }

  public onSelectYear(event: any){

  }

  public onSelectMonth(event: any){
    
  }

  private createChartParamtersForm() {
    return this.formBuilder.group({
      year: [this.currentYear],
      month: [this.currentMonth.value]
    });
  }

  private renderChart(){
    this.chartOptions = {
      series: [
        {
          name: "Ksh (thousand)",
          data: [47, 360, 130, 125, 856, 891, 933, 230, 352, 445, 789, 778]
        }
      ],
      chart: {
        height: 400,
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#9B2728"
      ],
      plotOptions: {
        bar: {
          columnWidth: "30%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          ["Coffee"],
          ["Avocado"],
          ["Maize"],
          ["Rice"],
          ["Fruits"],
          ["Miraa"],
          ["Macadamia"],
          ["Sweet potatoes"],
          ["Pyrethrum"],
          ["Sweet sorghum"],
          ["Carrots"],
          ["Apple"],
        ],
        labels: {
          style: {
            colors: [
            ],
            fontSize: "12px"
          }
        }
      },
      yaxis: {
        title: {
          text: "Ksh (thousands)"
        }
      }
    };
  }

}