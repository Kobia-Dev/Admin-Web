import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable, Subject, forkJoin } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { CustomerService } from '../../services/customer.service';
import { FarmerService } from '../../services/farmer.service';
import { ManufacturerService } from '../../services/manufacturer.service';
import { ServiceProviderService } from '../../services/service-provider.service';
import { StaffService } from '../../services/staff.service';
import { WarehouseService } from '../../services/warehouse.service';
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
import { AgribusinessService } from '../../services/agribusiness.service';
import { DriverService } from '../../services/driver.service';
import { ProcessorsService } from '../../services/processors.service';

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
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.sass']
})
export class ActorsComponent extends BaseComponent implements OnInit {

  isLoading: boolean;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  destroy$: Subject<boolean> = new Subject<boolean>();
  farmers: any[] = [];
  farmersCount: number = 0;
  customers: any[] = [];
  customersCount: number = 0;
  manufacturers: any[] = [];
  manufacturersCount: number = 0;
  serviceProviders: any[] = [];
  providersCount: number = 0;
  staff: any[] = [];
  staffCount: number = 0;
  warehouses: any[] = [];
  warehoseCount: number = 0;
  processors: any[] = [];
  processorsCount: number = 0;
  drivers: any[] = [];
  driversCount: number = 0;
  agrodealears: any[] = [];
  agrodelearsCount: number = 0;



  constructor(
    private farmerService: FarmerService,
    private customerService: CustomerService,
    private manufacturerService: ManufacturerService,
    private providersService: ServiceProviderService,
    private staffService: StaffService,
    private warehouseService: WarehouseService,
    private diverServive: DriverService,
    private processorService: ProcessorsService,
    private agrodealersService: AgribusinessService) {
    super()
    this.chartOptions = {
      series: [
        {
          name: "Total",
          data: []
        }
      ],
      chart: {
        height: 506,
        type: "bar",
        events: {
          click: function (chart, w, e) {
          }
        }
      },
      colors: [],
      plotOptions: {
        bar: {
          columnWidth: "50%",
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
            colors: [],
            fontSize: "14px"
          }
        }
      }
    };
  }

  ngOnInit(): void {
    this.getAgrodelears();
    this.getCustomer();
    this.getDrivers();
    this.getFarmers();
    this.getManufacturers();
    this.getProcessors();
    this.getServiceProviders();
    this.getStaff();
    this.getWarehouses();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private renderCharts() {
    
    this.chartOptions.series = [
      {
        name: 'Total',
        data:[
          this.agrodelearsCount,
          this.customersCount,
          this.driversCount,
          this.farmersCount,
          this.manufacturersCount,
          this.processorsCount,
          this.providersCount,
          this.staffCount,
          this.warehoseCount
        ],
      },
    ];
    this.chartOptions.colors = [
      "#008FFB",
      "#FF4560",
      "#FEB019",
      "#00E396",
      "#775DD0",
      "#546E7A",
      "#26a69a",
      "#D10CE8",
      "#9B2827"
    ];
    this.chartOptions.xaxis.categories = [
      "Agrodealers",
      "Customers",
      "Drivers",
      "Farmers",
      "Manufacturers",
      "Processors",
      "Service providers",
      "Staff",
      "Warehouses"
    ];
  }

  private getAgrodelears() {
    this.agrodealersService.getAllAgribusiness().subscribe({
      next: ((res) => {
        this.agrodealears = res.entity;
        this.agrodelearsCount = this.agrodealears.length;
        this.renderCharts();
      }),
      error: ((error) => {
        console.log("Error fetching agrodealers", error);
      }),
      complete: (() => { })
    })
  }

  private getCustomer() {
    this.customerService.getAllCustomers().subscribe({
      next: ((res) => {
        this.customers = res.entity;
        this.customersCount = this.customers.length;
        this.renderCharts();
      }),
      error: ((error) => {
        console.log("Error fetching customers", error);
      }),
      complete: (() => { })
    })
  }

  private getDrivers() {
    this.diverServive.getAlldrivers().subscribe({
      next: ((res) => {
        this.drivers = res.entity;
        this.driversCount = this.drivers.length;
        this.renderCharts();
      }),
      error: ((error) => {
        console.log("Error fetching drivers", error)
      }),
      complete: (() => { })
    })
  }

  private getFarmers() {
    this.farmerService.getAllFarmers().subscribe({
      next: ((res) => {
        this.farmers = res.entity;
        this.farmersCount = this.farmers.length;
        this.renderCharts();
      }),
      error: ((error) => {
        console.log("Error Fetching farmers", error);
      }),
      complete: (() => { })
    })
  }

  private getManufacturers() {
    this.manufacturerService.getAllManufacturers().subscribe({
      next: ((res) => {
        this.manufacturers = res.entity;
        this.manufacturersCount = this.manufacturers.length;
        this.renderCharts();
      }),
      error: ((error) => {
        console.log("Error fetching manufacturers", error);
      }),
      complete: (() => { })
    })
  }

  private getProcessors() {
    this.processorService.getAllProcesors().subscribe({
      next: ((res) => {
        this.processors = res.entity;
        this.processorsCount = this.processors.length;
        this.renderCharts();
      }),
      error: ((error) => {
        console.log("Error fetching processors", error);
      }),
      complete: (() => { })
    })
  }

  private getServiceProviders() {
    this.providersService.getAllServiceProviders().subscribe({
      next: ((res) => {
        this.serviceProviders = res.entity;
        this.providersCount = this.serviceProviders.length;
        this.renderCharts();
      }),
      error: ((error) => {
        console.log("Error fetching servive providers", error);
      }),
      complete: (() => { })
    })
  }

  private getStaff() {
    this.staffService.getAllStaff().subscribe({
      next: ((res) => {
        this.staff = res.entity;
        this.staffCount = this.staff.length;
        this.renderCharts();
      }),
      error: ((error) => {
        console.log("Error fetching staff", error);
      }),
      complete: (() => { })
    })
  }

  private getWarehouses() {
    this.warehouseService.getAllWarehouses().subscribe({
      next: ((res) => {
        this.warehouses = res.entity;
        this.warehoseCount = this.warehouses.length;
        this.renderCharts();
      }),
      error: ((error) => {
        console.log("Error fetching warehouses", error);
      }),
      complete: (() => { })
    })
  }

}