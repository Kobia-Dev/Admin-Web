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
import { AdminService } from '../../services/admin.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { HttpParams } from '@angular/common/http';
import { DataService } from 'src/app/market-place/services/data.service';
import { FarmerService } from '../../services/farmer.service';
import { Observable, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  selector: 'app-actor-per-region',
  templateUrl: './actor-per-region.component.html',
  styleUrls: ['./actor-per-region.component.css']
})
export class ActorPerRegionComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  usersList: any;
  apiKey = 'ge-3a392da5c721d06f';
  roles: string[];
  regions: any;
  counties: any;
  selectedData: any;
  roleToRegionCountyMap = {};

  constructor(
    private adminService: AdminService,
    private tokenStorage: TokenStorageService,
    private farmerService: FarmerService,
    private formBuilder: FormBuilder) {
    this.chartOptions = {
      series: [],
      chart: {
        height: 440,
        type: "bar",
        events: {
          click: function (chart, w, e) {
          }
        }
      },
      colors: ["#9B2728"],
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
            colors: ["#9B2728"],
            fontSize: "12px"
          }
        }
      }
    };
  }

  form: FormGroup = this.formBuilder.group({
    role: [''],
    region: [''],
    county: ['']
  });

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    const data = this.tokenStorage.getUser();
    const accessToken = data.access_token;
    this.adminService.getAllUsers(accessToken).subscribe({
      next: ((res) => {
        if (res.statusCode === 200) {
          this.usersList = res.entity;
          console.log('User List', this.usersList);

          const coordinatesWithRoles = this.usersList.map(user => {
            return {
              latitude: user.latitude,
              longitude: user.longitude,
              role: user.role
            };
          });
          console.log('coordinates with roles', coordinatesWithRoles);

          const locationObservables = coordinatesWithRoles.map(item => {
            const latitude = item.latitude;
            const longitude = item.longitude;
            const params = new HttpParams()
              .set('api_key', this.apiKey)
              .set('point.lat', latitude.toString())
              .set('point.lon', longitude.toString());
            return { params, role: item.role };
          });

          forkJoin(locationObservables.map(item => this.getLocationAddress(item.params))).subscribe((locations: any[]) => {
            locations.forEach((location, index) => {
              const role = locationObservables[index].role;
              if (!this.roleToRegionCountyMap[role]) {
                this.roleToRegionCountyMap[role] = { regions: {} };
              }
              location.features.forEach(feature => {
                const region = feature.properties.region;
                const county = feature.properties.county;
                if (region && county) {
                  if (!this.roleToRegionCountyMap[role].regions[region]) {
                    this.roleToRegionCountyMap[role].regions[region] = { county_names: {} };
                  }
                  if (!this.roleToRegionCountyMap[role].regions[region].county_names[county]) {
                    this.roleToRegionCountyMap[role].regions[region].county_names[county] = { count: 1 };
                  } else {
                    this.roleToRegionCountyMap[role].regions[region].county_names[county].count++;
                  }
                }
              });
            });
            console.log('Role to Region-County Mapping', this.roleToRegionCountyMap);
            this.roles = Object.keys(this.roleToRegionCountyMap);
          });

        }
      }),
      error: ((error) => {
        console.log('Error', error);
      }),
      complete: (() => { })
    })
  }

  private getLocationAddress(params: HttpParams): Observable<any> {
    return this.farmerService.getLocationDetails(params)
  }

  public onSelectRole(event: any) {
    const selectedRole = this.form.get('role').value;
    this.regions = Object.keys(this.roleToRegionCountyMap[selectedRole]['regions']);
  }

  public onSelectRegion(event: any) {
    const selectedRole = this.form.get('role').value;
    const selectedRegion = this.form.get('region').value;
    const regionData = this.roleToRegionCountyMap[selectedRole]['regions'][selectedRegion];
    const countiesData = regionData['county_names'];

    const counties = Object.keys(countiesData).map((countyName) => ({
      counties: {
        [countyName]: {
          count: countiesData[countyName]['count'],
        }
      }
      // name: countyName,
      // count: countiesData[countyName]['count'],
    }));

    console.log('data', counties);

    this.renderChart(counties);
  }

  private renderChart(data) {
    const countiesObject = data[0].counties;
    const chartData = [];
  
    for (const countyName in countiesObject) {
      if (countiesObject.hasOwnProperty(countyName)) {
        const count = countiesObject[countyName].count;
        chartData.push({ x: countyName, y: count });
      }
    }
  
    this.chartOptions.series = [
      {
        name: 'Total',
        data: chartData,
      },
    ];
  
    this.chartOptions.xaxis.categories = chartData.map(item => item.x);
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