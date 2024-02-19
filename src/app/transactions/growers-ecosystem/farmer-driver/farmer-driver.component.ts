import { formatDate } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Observable } from 'rxjs';
import { TransactionsDriverService } from 'src/app/admin/services/transactions.driver.service';

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

interface RegionData {
  regions: Record<string, { county_names: Record<string, { count: number }> }>;
}

@Component({
  selector: 'app-farmer-driver',
  templateUrl: './farmer-driver.component.html',
  styleUrls: ['./farmer-driver.component.css']
})
export class FarmerDriverComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  chartDispType: any = [2022, 2023, 2024, 2025, 2026];
  drivers: any[] = [];
  apiKey = 'ge-3a392da5c721d06f';
  regionCountyMapping: any;
  loc = [];
  transformedData: any;
  data: RegionData;
  regions: any;
  defaultRegion = "Nairobi";
  defaultCounty = "Nairobi";
  selectedRegion: string = '';
  selectedCounty: string = '';
  selectedYear: string = '';
  selectedMonth: string = '';
  selectedRegionCounties = {};
  countyName: any;
  count: any;

  regionsArray: any = ["Nairobi", "Central", "Coast", "Eastern", "North Eastern", "Nyanza", "Rift Valley", "Western"];
  countiesArray: any = ["Nairobi", "Nakuru", "Kiambu", "Turkana", "Uasin Gishu", "Kirinyaga", "Bomet", "Machakos", "Makueni", "Elgeyo Marakwet", "Baringo", "Laikipia", "Embu", "Samburu", "Kilifi", "Kakamega", "Taita-Taveta", "Nandi", "Nyandarua", "Nyamira", "Kitui", "Vihiga", "Kajiado", "Tana River", "Kisumu", "Mombasa", "Kwale", "Lamu", "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka-nithi", "Nyeri", "Muranga",];

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
  constructor(private formBuilder: FormBuilder, 
    private transactionsDriverService: TransactionsDriverService) { 
      this.renderChart()
    }

  form: FormGroup = this.formBuilder.group({
    region: [''],
    year: [''],
    month: [''],
  })

  ngOnInit(): void {
    this.getTransactions();
    this.form = this.createChartParamtersForm();
    this.fetchData();
  }

  private getTransactions() {
    // this.renderChart();
    this.transactionsDriverService.getAllTransactions().subscribe({
      next: ((res) => {
        if (res.statusCode === 200) {
          this.drivers = res.entity;
          const coordinates = this.drivers.map(driver => ({
            latitude: driver.user.latitude,
            longitude: driver.user.longitude,
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


  fetchData() {

    this.transactionsDriverService.fetchData(
      this.selectedRegion,
      this.selectedCounty,
      this.selectedYear,
      this.selectedMonth
    ).subscribe((response) => {

      this.data = response.entity;
      this.updateChart();
    });
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
    return this.transactionsDriverService.getLocationDetails(params)
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
          // this.renderChart();
        }
      }
    } else {
      this.selectedRegionCounties = {};
      this.updateChart();
    }
  }

  updateChart() {

    if (this.data && this.data.regions) {
      // Initialize arrays to store chart data
      const categories = [];
      const seriesData = [];

      // Iterate over regions and counties
      for (const region in this.data.regions) {
        if (this.data.regions.hasOwnProperty(region)) {
          const countyNames = this.data.regions[region].county_names;
          for (const county in countyNames) {
            if (countyNames.hasOwnProperty(county)) {
              // Access the properties you need
              categories.push(county);
              seriesData.push(countyNames[county].count);
            }
          }
        }
      }
      this.chartOptions.xaxis.categories = categories;
      this.chartOptions.series = [{ data: seriesData }];
    }
  }

  // public onSelectRegion(event: any){
  //   this.selectedRegion = event.value;
  //   this.fetchData();
  // }

  public onSelectCounty(event: any) {
    this.selectedCounty = event.value;
    this.fetchData();
  }


  public onSelectYear(event: any) {
    this.selectedYear = event.value;
    this.fetchData();
  }

  public onSelectMonth(event: any) {
    this.selectedYear = event.value;
    this.fetchData();
  }

  private createChartParamtersForm() {
    return this.formBuilder.group({
      region: new FormControl(this.defaultRegion),
      county: new FormControl(this.defaultCounty),
      year: [this.currentYear],
      month: [this.currentMonth.value]
    });
  }

  private renderChart() {
    if (this.selectedRegionCounties) {
      const countyNames = Object.keys(this.selectedRegionCounties);
      const countyCounts = countyNames.map(countyName => this.selectedRegionCounties[countyName].count);
      this.chartOptions = {
        series: [
          {
            name: "Ksh (thousand)",
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
          }
        ],
        chart: {
          type: "bar",
          height: 400
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
            "Coffee",
            "Tea",
            "Milk",
            "Oranges",
            "Apples",
            "Bananas",
            "Avocados",
            "Mangoes",
            "Pineapples"
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
