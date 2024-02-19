import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  selector: 'app-farmer-service-provider',
  templateUrl: './farmer-service-provider.component.html',
  styleUrls: ['./farmer-service-provider.component.css']
})
export class FarmerServiceProviderComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  chartDispType: any = [2022, 2023, 2024, 2025, 2026];
  defaultRegion = "Nairobi";
  defaultCounty ="Nairobi";

regionsArray: any = ["Nairobi", "Central", "Coast","Eastern","North Eastern","Nyanza","Rift Valley","Western"];
countiesArray: any = ["Nairobi", "Nakuru", "Kiambu","Turkana","Uasin Gishu","Kirinyaga","Bomet","Machakos","Makueni","Elgeyo Marakwet","Baringo","Laikipia","Embu","Samburu","Kilifi","Kakamega","Taita-Taveta","Nandi","Nyandarua","Nyamira","Kitui","Vihiga","Kajiado","Tana River","Kisumu","Mombasa","Kwale","Lamu","Garissa","Wajir","Mandera","Marsabit","Isiolo","Meru","Tharaka-nithi","Nyeri","Muranga",];

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
  monthlyStr = formatDate(Date.now(),'MONTH', 'en-US')
  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup = this.formBuilder.group({
    year: [''],
    month: [''],
  })
  
  ngOnInit(): void {
  
    this.form = this.createChartParamtersForm();
    this.getTransactions();
  }

  private getTransactions(){
    this.renderChart();
  }

  public onSelectRegion(event: any){

  }

  public onSelectCounty(event: any){

  }

  public onSelectYear(event: any){

  }

  public onSelectMonth(event: any){
    
  }

  private createChartParamtersForm() {
    return this.formBuilder.group({
      region: new FormControl(this.defaultRegion),
      county: new FormControl(this.defaultCounty),
      year: [this.currentYear],
      month: [this.currentMonth.value]
    });
  }

  private renderChart(){
    this.chartOptions = {
      series: [
        {
          name: "Ksh (thousand)",
          data: [67, 265, 145, 133, 785, 881, 763, 115, 362, 225, 775, 588]
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
          ["Avocado"],
          ["Maize"],
          ["Rice"],
          ["Coffee"],
          ["Fruits"],
          ["Miraa"],
          ["Carrots"],
          ["Apple"],
          ["Macadamia"],
          ["Sweet potatoes"],
          ["Pyrethrum"],
          
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