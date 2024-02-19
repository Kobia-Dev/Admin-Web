import { Component, OnInit, ViewChild } from '@angular/core';

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
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { DataService } from 'src/app/market-place/services/data.service';
import { AgribusinessService } from 'src/app/admin/services/agribusiness.service';

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
  selector: 'app-agrodealer-distribution',
  templateUrl: './agrodealer-distribution.component.html',
  styleUrls: ['./agrodealer-distribution.component.css']
})
export class AgrodealerDistributionComponent implements OnInit {

  kenyanRegions: string[] = ['Central', 'Coast', 'Eastern', 'Nairobi', 'North Eastern', 'Nyanza', 'Rift Valley'];

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
   locations: any;
  agribusiness: any[] = [];
  apiKey = 'ge-3a392da5c721d06f';
  regionCountyMapping: any;
  loc = [];
  transformedData: any;
  data: any;
  regions: any;
  selectedRegionCounties = {};
  countyName: any;
  count: any;

  constructor(
    private agribusinessService: AgribusinessService,
    private formBuilder: FormBuilder) {
  }

  form: FormGroup = this.formBuilder.group({
    region: [''],
  });

  ngOnInit(): void {
    this.getAgribusiness();
    this.form = this.createChartParamtersForm();
    this.renderChart();
  }

  private getAgribusiness() {

    this.agribusinessService.getAllAgribusiness().subscribe({
      next: ((res) => {
        if (res.statusCode === 200) {
          this.agribusiness = res.entity;
          const coordinates = this.agribusiness.map(agribusiness => ({
            latitude: agribusiness.user.latitude,
            longitude: agribusiness.user.longitude,
          }));
          console.log('Coordinates', coordinates);
          const locationObservables = coordinates.map(coord => {
            const params = new HttpParams()
              .set('api_key', this.apiKey)
              .set('point.lat', coord.latitude)
              .set('point.lon', coord.longitude);
            return this.getLocationAddress(params);
          });
          forkJoin(locationObservables).subscribe(locations => {
            console.log('Locations', locations);
            this.loc = locations;
            if (!locations || locations.length === 0) {
              console.log('Locations is empty or undefined');
              return;
            }
            this.regionCountyMapping = this.mapRegionsToCounties(this.loc);
            console.log('Mapping', this.regionCountyMapping);
            this.data = this.transformRegionCountyMapping(this.regionCountyMapping);
            console.log('Our array', this.data);
            this.regions = Object.keys(this.data.regions);
            console.log('On the chart', this.regions);
          });
        } else {
        }
      }),
      error: ((error) => {
        console.log('Error', error);
      }),
      complete: (() => { })
    })
  }

  private mapRegionsToCounties(data: Location[]): Record<string, { counties: Record<string, number> }> {
    const regionCountyMapping: Record<string, { counties: Record<string, number> }> = {};

    data.forEach((item) => {
      item.features.forEach((feature) => {
        const region = feature.properties?.region;
        const county = feature.properties?.county;

        if (region && county) {
          if (!regionCountyMapping[region]) {
            regionCountyMapping[region] = { counties: {} };
          }
          if (!regionCountyMapping[region].counties[county]) {
            regionCountyMapping[region].counties[county] = 1;
          } else {
            regionCountyMapping[region].counties[county]++;
          }
        }
      });
    });

    return regionCountyMapping;
  }

  private transformRegionCountyMapping(regionCountyMapping: Record<string, { counties: Record<string, number> }>): any {
    const transformedData: Record<string, Record<string, { county_names: Record<string, { count: number; }> }>> = { regions: {} };

    for (const region in regionCountyMapping) {
      if (regionCountyMapping.hasOwnProperty(region)) {
        transformedData.regions[region] = { county_names: {} };
        for (const county in regionCountyMapping[region].counties) {
          if (regionCountyMapping[region].counties.hasOwnProperty(county)) {
            transformedData.regions[region].county_names[county] = {
              count: regionCountyMapping[region].counties[county]
            };
          }
        }
      }
    }

    return transformedData;
  }

  private getLocationAddress(params: HttpParams): Observable<any> {
    return this.agribusinessService.getLocationDetails(params)
  }

  public onSelectRegion(event: any) {
    const selectedRegion = this.form.get('region')?.value;

    if (selectedRegion) {
      const countyNames: Record<string, { count: number }> = this.data.regions[selectedRegion].county_names;
      this.selectedRegionCounties = countyNames;
      for (this.countyName in countyNames) {
        if (countyNames.hasOwnProperty(this.countyName)) {
          this.count = countyNames[this.countyName].count;
          console.log(`Count of ${this.countyName}: ${this.count}`);
          this.renderChart();
        }
      }
    } else {
      this.selectedRegionCounties = {};
      this.renderChart();
    }
  }

  private renderChart() {
    if (this.selectedRegionCounties) {
      const countyNames = Object.keys(this.selectedRegionCounties);
      const countyCounts = countyNames.map(countyName => this.selectedRegionCounties[countyName].count);
      this.chartOptions = {
        series: [
          {                                                  
            name: "Total",
            data: countyCounts
          }
        ],
        chart: {
          height: 400,
          type: "bar",
          events: {
            click: function (chart, w, e) {
            }
          }
        },
        colors: [
          "#9B2728"
        ],
        plotOptions: {
          bar: {
            columnWidth: "5%",
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
          categories: countyNames,
          labels: {
            style: {
              fontSize: "12px"
            }
          }
        }
  
      };
    }else{
      this.chartOptions = {
        series: [
          {
            name: "Total",
            data: []
          }
        ],
        chart: {
          height: 400,
          type: "bar",
          events: {
            click: function (chart, w, e) {
            }
          }
        },
        colors: [
          "#9B2728"
        ],
        plotOptions: {
          bar: {
            columnWidth: "5%",
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
          categories: [],
          labels: {
            style: {
              fontSize: "12px"
            }
          }
        }
  
      };
    }
  }

  private createChartParamtersForm() {

    return this.formBuilder.group({
      region: []
    });
  }

}

interface Location {
  region: string;
  county: string;
  features: {
    properties: {
      region: string;
      county: string;
    };
  }[];
}