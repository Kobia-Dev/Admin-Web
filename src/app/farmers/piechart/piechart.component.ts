import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexNonAxisChartSeries, ApexPlotOptions, ApexChart, ChartComponent } from 'ng-apexcharts';
import { FarmerService } from 'src/app/admin/services/farmer.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.sass']
})
export class PieChartComponent implements OnInit{
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  farmers: any;
  agrodelearsCount: number = 0;
  femaleCount: number = 0;
  maleCount: number = 0;
  isLoading: boolean = true;
  farmersCount: number;

  constructor(private farmerService: FarmerService) {
    this.renderChart();
  }

  ngOnInit(): void {
  }

  public getFarmers() {
    this.farmerService.getAllFarmers().subscribe({
      next: ((res) => {
        this.farmers = res.entity;
        console.log("farmers list", this.farmers);
        if (this.farmers) {
          this.farmersCount = this.farmers.length;
          this.isLoading = false;
        }

        for ( const sex of this.farmers){
          if (sex.gender !== "MALE"){
            this.maleCount++;
          }else if (sex.gender !== "FEMALE"){
            this.femaleCount++
          }
        }
      }),
      error: ((error) => {

        this.isLoading = false;
      }),
      complete: (() => { })
    })
  }

  private renderChart(){
    this.chartOptions = {
      series: [55, 45],
      chart: {
        height: 400,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px'
            },
            value: {
              fontSize: '16px'
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                return '100'
              }
            }
          }
        }
      },
      labels: ['Male', 'Female']
    };
  }
}






