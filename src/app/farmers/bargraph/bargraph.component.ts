import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-barchart',
  templateUrl: './bargraph.component.html',
  styleUrls: ['./bargraph.component.sass']
})
export class BarchartComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Onboarded Farmers',
          data: [76, 85, 102, 98, 87, 108, 98, 117, 94, 123, 132, 96]
        },


        {
          name: 'Active',
          data: [47, 57, 88, 67, 75, 101, 83, 103, 74, 114, 118, 42]
        },

        {
          name: 'Pending verification',
          data: [14, 25, 30, 27, 35, 41, 33, 43, 34, 44, 28, 62]
        },



      ],
      chart: {
        type: 'bar',
        height: 490
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      },
      yaxis: {
        title: {
          text: ''
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return ' ' + val + ' ';
          }
        }
      }
    };
  }

  ngOnInit(): void { }
}


