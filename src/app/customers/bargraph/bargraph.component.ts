import { Component, ViewChild, OnInit } from "@angular/core";

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexFill,
  ApexLegend
} from "ng-apexcharts";



export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};




@Component({
  selector: "app-barchart",
  templateUrl: './bargraph.component.html',
  styleUrls: ["./bargraph.component.sass"]
})


export class BarchartComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Onboarded",
          data: [240, 430, 380, 589, 520, 783, 310]
        },
        {
          name: "Active",
          data: [127, 287, 322, 400, 430, 604, 248]
        },
        {
          name: "Pending",
          data: [153, 167, 183, 142, 113, 174, 102]
        },

      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      title: {
        text: "Customers"
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July']
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K";
          }
        }
      },

      fill: {
        opacity: 1
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40
      }
    };
  }
}



